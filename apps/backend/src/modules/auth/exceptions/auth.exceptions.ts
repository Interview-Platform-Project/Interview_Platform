import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyRegisteredException extends HttpException {
  constructor() {
    super('Email already registered', HttpStatus.CONFLICT);
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Invalid email or password', HttpStatus.UNAUTHORIZED);
  }
}

export class RefreshTokenMissingException extends HttpException {
  constructor() {
    super('No refresh token provided', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidRefreshTokenException extends HttpException {
  constructor() {
    super('Invalid refresh token', HttpStatus.UNAUTHORIZED);
  }
}

export class RefreshTokenRevokedException extends HttpException {
  constructor() {
    super('Refresh token revoked', HttpStatus.UNAUTHORIZED);
  }
}
