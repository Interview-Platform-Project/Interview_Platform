import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';
import { AuthStrategies } from '../enums/auth-strategies';

export interface JwtPayload {
  /** User ID */
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthStrategies.JWT) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Cookie-first: preferred for browser clients (XSS-safe)
        (req: Request) => (req?.cookies as Record<string, string>)?.access_token ?? null,
        // Bearer header fallback: for API clients (Swagger, mobile, server-to-server)
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.getOrThrow<string>('jwt.secret'),
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload): AuthenticatedUser {
    return { id: payload.sub, email: payload.email};
  }
}
