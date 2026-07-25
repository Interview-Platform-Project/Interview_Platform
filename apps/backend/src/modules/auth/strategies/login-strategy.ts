import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AuthStrategies } from '../enums/auth-strategies';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, AuthStrategies.LOGIN) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<AuthenticatedUser> {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid email or password');
    return { id: user.id, email: user.email };
  }
}
