import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AuthStrategies } from '../enums/auth-strategies';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';
import { InvalidCredentialsException } from '../exceptions/auth.exceptions';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, AuthStrategies.LOGIN) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<AuthenticatedUser> {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new InvalidCredentialsException();
    return { id: user.id, email: user.email };
  }
}
