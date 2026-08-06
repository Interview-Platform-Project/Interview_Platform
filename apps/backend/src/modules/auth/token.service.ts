import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Response } from 'express';
import type { AppConfig } from '../../config/configuration';
import { Tokens } from './enums/tokens';

@Injectable()
export class TokenService {
  private readonly app: AppConfig['app'];
  private readonly jwt: AppConfig['jwt'];

  constructor(configService: ConfigService<AppConfig, true>) {
    this.app = configService.get('app', { infer: true });
    this.jwt = configService.get('jwt', { infer: true });
  }

  setTokenCookies(res: Response, accessToken: string, refreshToken: string): void {
    const isProduction = this.app.nodeEnv === 'production';

    res.cookie(Tokens.ACCESS, accessToken, {
      ...this.defaultCookies(isProduction),
      ...this.defaultAccessCookies(),
    });

    res.cookie(Tokens.REFRESH, refreshToken, {
      ...this.defaultCookies(isProduction),
      ...this.defaultRefreshCookies(),
    });
  }

  clearTokenCookies(res: Response): void {
    const isProduction = this.app.nodeEnv === 'production';
    res.clearCookie(Tokens.ACCESS, {
      ...this.defaultCookies(isProduction),
      ...this.defaultAccessCookies(),
    });
    res.clearCookie(Tokens.REFRESH, {
      ...this.defaultCookies(isProduction),
      ...this.defaultRefreshCookies(),
    });
  }

  private defaultAccessCookies(): CookieOptions {
    return {
      sameSite: 'lax',
      maxAge: this.jwt.accessExpiresMs,
    };
  }

  private defaultRefreshCookies(): CookieOptions {
    return {
      sameSite: 'strict',
      path: this.buildAuthPath(),
      maxAge: this.jwt.refreshExpiresMs,
    };
  }

  private defaultCookies(isProduction: boolean): CookieOptions {
    return {
      httpOnly: true,
      secure: isProduction,
    };
  }

  private buildAuthPath(): string {
    return `/${this.app.globalPrefix}/${this.app.apiVersion}/auth`;
  }
}
