import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import type { Redis } from 'ioredis';
import { REDIS_CLIENT } from '../../redis/redis.constants';
import { PrismaService } from '../../database/prisma.service';
import type { JwtPayload } from './strategies/jwt.strategy';
import type { RegisterDto } from './dto/register.dto';
import { User } from '#prisma/client';
import {
  AuthenticatedUser
} from './decorators/current-user.decorator';

const REFRESH_PREFIX = 'refresh:';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  /** Validates email/password, returns user record or null. Used by LocalStrategy. */
  async validateUser(email: string, password: string): Promise<AuthenticatedUser|null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const valid = await argon2.verify(user.passwordHash, password);
    return valid ? user : null;
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await argon2.hash(dto.password);
    const user = await this.prisma.user.create({
      data: { email: dto.email, name: dto.name, passwordHash },
    });

    return this.generateTokens(user.id, user.email);
  }

  async login(userId: string, email: string) {
    return this.generateTokens(userId, email);
  }

  async refresh(rawRefreshToken: string) {
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify<JwtPayload>(rawRefreshToken, {
        secret: this.configService.getOrThrow<string>('jwt.refreshSecret'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const storedHash = await this.redis.get(`${REFRESH_PREFIX}${payload.sub}`);
    if (!storedHash) throw new UnauthorizedException('Refresh token revoked');

    const valid = await argon2.verify(storedHash, rawRefreshToken);
    if (!valid) throw new UnauthorizedException('Invalid refresh token');

    return this.generateTokens(payload.sub, payload.email);
  }

  async logout(userId: string) {
    await this.redis.del(`${REFRESH_PREFIX}${userId}`);
  }

  private async generateTokens(userId: string, email: string) {
    const payload: JwtPayload = { sub: userId, email: email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload as object),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.jwtService.signAsync(payload as object, {
        secret: this.configService.getOrThrow<string>('jwt.refreshSecret'),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expiresIn: Math.floor(this.configService.getOrThrow<number>('jwt.refreshExpiresMs') / 1000) as any,
      }),
    ]);

    await this.storeRefreshToken(userId, refreshToken);
    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(userId: string, rawToken: string) {
    const ttlSeconds = Math.floor(this.configService.getOrThrow<number>('jwt.refreshExpiresMs') / 1000);
    const hashed = await argon2.hash(rawToken);
    await this.redis.set(`${REFRESH_PREFIX}${userId}`, hashed, 'EX', ttlSeconds);
  }
}
