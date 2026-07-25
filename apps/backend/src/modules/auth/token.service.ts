import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  setTokenCookies(res: Response, accessToken: string, refreshToken: string): void {
    const isProduction = this.configService.get<string>('app.nodeEnv') === 'production';
    const authPath = this.buildAuthPath();

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: this.configService.getOrThrow<number>('jwt.accessExpiresMs'),
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      path: authPath,
      maxAge: this.configService.getOrThrow<number>('jwt.refreshExpiresMs'),
    });
  }

  clearTokenCookies(res: Response): void {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token', { path: this.buildAuthPath() });
  }

  private buildAuthPath(): string {
    const prefix = this.configService.get<string>('app.globalPrefix', 'api');
    const ver = this.configService.get<string>('app.apiVer', 'v1');
    return `/${prefix}/${ver}/auth`;
  }
}
