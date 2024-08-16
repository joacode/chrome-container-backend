import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckApiController } from './healthcheck.controller';

@Module({
  imports: [
    TerminusModule.forRoot({
      gracefulShutdownTimeoutMs: Number(
        process.env.GRACEFUL_SHUTDOWN_TIMEOUT_MS ?? 5000,
      ),
    }),
  ],
  controllers: [HealthCheckApiController],
})
export class HealthcheckApiModule {}
