import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { HealthResponse } from '@ip/shared/src/interfaces/interfaces';
import { HealthService } from './health.service';
import { Tokens } from '../auth/enums/tokens';

@ApiTags('health')
@ApiBearerAuth()
@ApiCookieAuth(Tokens.ACCESS)
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Health check' })
  @ApiOkResponse({ description: 'Service health status' })
  check(): Promise<HealthResponse> {
    return this.healthService.check();
  }
}
