import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';
import type { AppConfig } from '../../../config/configuration';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';
import { AuthStrategies } from '../enums/auth-strategies';
import { Tokens } from '../enums/tokens';

export interface JwtPayload {
  /** User ID */
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthStrategies.JWT) {
  constructor(configService: ConfigService<AppConfig, true>) {
    const jwt = configService.get('jwt', { infer: true });
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Cookie-first: preferred for browser clients (XSS-safe)
        (req: Request) => (req?.cookies as Record<string, string>)?.[Tokens.ACCESS] ?? null,
        // Bearer header fallback: for API clients (Swagger, mobile, server-to-server)
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: jwt.secret,
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload): AuthenticatedUser {
    return { id: payload.sub, email: payload.email };
  }
}
