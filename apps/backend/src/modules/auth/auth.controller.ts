import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { RegisterDto } from './dto/register.dto';
import { LoginAuthGuard } from './guards/login-auth-guard';
import { Public } from './decorators/public.decorator';
import { CurrentUser, type AuthenticatedUser } from './decorators/current-user.decorator';
import { Tokens } from './enums/tokens';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new account and sign in' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'name', 'password'],
      properties: {
        email: { type: 'string', format: 'email', example: 'user@example.com' },
        name: { type: 'string', minLength: 4, maxLength: 100, example: 'John Doe' },
        password: { type: 'string', minLength: 8, maxLength: 128, example: 'p@ssw0rd' },
      },
    },
  })
  @ApiCreatedResponse({ description: 'Account created, tokens issued, user returned' })
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.register(dto);
    const { accessToken, refreshToken } = await this.authService.login(user.id, user.email);
    this.tokenService.setTokenCookies(res, accessToken, refreshToken);
    return { user };
  }

  @Public()
  @UseGuards(LoginAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email', example: 'user@example.com' },
        password: { type: 'string', minLength: 8, maxLength: 128, example: 'p@ssw0rd' },
      },
    },
  })
  @ApiOkResponse({ description: 'Tokens issued, set as HttpOnly cookies' })
  async login(
    @Req() req: Request & { user: AuthenticatedUser },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(req.user.id, req.user.email);
    this.tokenService.setTokenCookies(res, accessToken, refreshToken);
    return { user: req.user };
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth(Tokens.REFRESH)
  @ApiOperation({ summary: 'Rotate tokens using the refresh_token cookie' })
  @ApiOkResponse({ description: 'New tokens issued' })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = (req.cookies as Record<string, string>)?.[Tokens.REFRESH];
    const { accessToken, refreshToken } = await this.authService.refreshTokens(token);
    this.tokenService.setTokenCookies(res, accessToken, refreshToken);
    return { message: 'Tokens refreshed' };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiCookieAuth(Tokens.ACCESS)
  @ApiOperation({ summary: 'Logout and revoke refresh token' })
  @ApiOkResponse({ description: 'Logged out, cookies cleared' })
  async logout(@CurrentUser() user: AuthenticatedUser, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(user.id);
    this.tokenService.clearTokenCookies(res);
    return { message: 'Logged out' };
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiCookieAuth(Tokens.ACCESS)
  @ApiOperation({ summary: 'Get current authenticated user info' })
  @ApiOkResponse({ description: 'Current user from JWT payload' })
  me(@CurrentUser() user: AuthenticatedUser) {
    return { user };
  }
}
