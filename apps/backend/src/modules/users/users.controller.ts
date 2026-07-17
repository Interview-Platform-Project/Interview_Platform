import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { UserResponse } from '@ip/shared/src/interfaces/interfaces';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List users' })
  @ApiOkResponse({ description: 'User list' })
  findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }
}
