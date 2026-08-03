import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, type JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { AppConfig } from '../../config/configuration';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { LoginStrategy } from './strategies/login-strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService<AppConfig, true>): JwtModuleOptions => {
        const jwt = cfg.get('jwt', { infer: true });
        return {
          secret: jwt.secret,
          signOptions: {
            expiresIn: Math.floor(jwt.accessExpiresMs / 1000),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    LoginStrategy,
    JwtStrategy,
    {
      // Register JwtAuthGuard as the global guard for the whole application.
      // All routes are protected by default; use @Public() to opt out.
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
