import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthCheckApiController {
  constructor(
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Service healthy',
  })
  @ApiResponse({
    status: 503,
    description: 'The service of some of its dependencies are unavailable',
  })
  healthcheck() {
    return this.healthCheckService.check([
      () => this.typeOrmHealthIndicator.pingCheck('database'),
    ]);
  }
}
