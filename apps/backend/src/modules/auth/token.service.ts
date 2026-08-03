import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import type { AppConfig } from '../../config/configuration';

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
    const authPath = this.buildAuthPath();

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: this.jwt.accessExpiresMs,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      path: authPath,
      maxAge: this.jwt.refreshExpiresMs,
    });
  }

  clearTokenCookies(res: Response): void {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token', { path: this.buildAuthPath() });
  }

  private buildAuthPath(): string {
    return `/${this.app.globalPrefix}/${this.app.apiVer}/auth`;
  }
}
