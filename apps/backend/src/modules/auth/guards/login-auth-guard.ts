import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { ValidationPipe } from '../../../common/pipes/validation.pipe';
import { LoginDto } from '../dto/login.dto';
import { AuthStrategies } from '../enums/auth-strategies';

@Injectable()
export class LoginAuthGuard extends AuthGuard(AuthStrategies.LOGIN) {
  private readonly validationPipe = new ValidationPipe();

  async canActivate(context: ExecutionContext) {
    // Run ValidationPipe (same as global) before Passport so field errors return 400, not 401
    const request = context.switchToHttp().getRequest<Request>();
    await this.validationPipe.transform(request.body, {
      metatype: LoginDto,
      type: 'body',
      data: '',
    });

    return super.canActivate(context) as Promise<boolean>;
  }
}
