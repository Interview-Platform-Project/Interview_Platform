import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import type { Redis } from 'ioredis';
import { REDIS_CLIENT } from '../../redis/redis.constants';
import { PrismaService } from '../../database/prisma.service';
import type { AppConfig } from '../../config/configuration';
import type { JwtPayload } from './strategies/jwt.strategy';
import type { RegisterDto } from './dto/register.dto';
import type { AuthenticatedUser } from './decorators/current-user.decorator';
import {
  EmailAlreadyRegisteredException,
  RefreshTokenMissingException,
  InvalidRefreshTokenException,
  RefreshTokenRevokedException,
} from './exceptions/auth.exceptions';

const REFRESH_PREFIX = 'refresh:';

@Injectable()
export class AuthService {
  private readonly jwt: AppConfig['jwt'];

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    configService: ConfigService<AppConfig, true>,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {
    this.jwt = configService.get('jwt', { infer: true });
  }

  /** Validates email/password, returns user record or null. Used by LocalStrategy. */
  async validateUser(rawEmail: string, password: string): Promise<AuthenticatedUser | null> {
    const email: string = this.cleanEmail(rawEmail);
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { credential: true },
    });
    if (!user?.credential) return null;

    const valid = await argon2.verify(user.credential.passwordHash, password);
    return valid ? { id: user.id, email: user.email } : null;
  }

  async register(dto: RegisterDto): Promise<AuthenticatedUser> {
    const cleanedEmail: string = this.cleanEmail(dto.email);
    const existing = await this.prisma.user.findUnique({ where: { email: cleanedEmail } });
    if (existing) throw new EmailAlreadyRegisteredException();

    const passwordHash = await argon2.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: cleanedEmail,
        name: dto.name,
        credential: { create: { passwordHash } },
      },
    });

    return { id: user.id, email: user.email };
  }

  async login(userId: string, email: string) {
    return this.generateTokens(userId, email);
  }

  async refreshTokens(rawRefreshToken: string | null | undefined) {
    if (!rawRefreshToken) throw new RefreshTokenMissingException();

    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify<JwtPayload>(rawRefreshToken, {
        secret: this.jwt.refreshSecret,
      });
    } catch {
      throw new InvalidRefreshTokenException();
    }

    const storedHash = await this.redis.get(`${REFRESH_PREFIX}${payload.sub}`);
    if (!storedHash) throw new RefreshTokenRevokedException();

    const valid = await argon2.verify(storedHash, rawRefreshToken);
    if (!valid) throw new InvalidRefreshTokenException();

    return this.generateTokens(payload.sub, payload.email);
  }

  async logout(userId: string) {
    await this.redis.del(`${REFRESH_PREFIX}${userId}`);
  }

  private cleanEmail(rawEmail: string): string {
    return rawEmail.trim().toLowerCase();
  }

  private async generateTokens(userId: string, email: string) {
    const payload: JwtPayload = { sub: userId, email };
    const refreshExpiresSec = Math.floor(this.jwt.refreshExpiresMs / 1000);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.jwt.refreshSecret,
        expiresIn: refreshExpiresSec,
      }),
    ]);

    await this.storeRefreshToken(userId, refreshToken, refreshExpiresSec);
    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(userId: string, rawToken: string, ttlSeconds: number) {
    const hashed = await argon2.hash(rawToken);
    await this.redis.set(`${REFRESH_PREFIX}${userId}`, hashed, 'EX', ttlSeconds);
  }
}
