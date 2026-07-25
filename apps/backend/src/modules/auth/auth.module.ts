import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, type JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
      useFactory: (cfg: ConfigService): JwtModuleOptions => ({
        secret: cfg.getOrThrow<string>('jwt.secret'),
        signOptions: {
          // expiresIn accepts seconds (number); convert from ms stored in config
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          expiresIn: Math.floor(cfg.getOrThrow<number>('jwt.accessExpiresMs') / 1000) as any,
        },
      }),
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
