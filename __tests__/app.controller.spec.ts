import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckApiController } from '../src/controllers/healthcheck/healthcheck.controller';

describe('AppController', () => {
  let appController: HealthCheckApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckApiController],
      imports: [
        TerminusModule.forRoot({
          gracefulShutdownTimeoutMs: Number(
            process.env.GRACEFUL_SHUTDOWN_TIMEOUT_MS ?? 5000,
          ),
        }),
      ],
    }).compile();

    appController = app.get<HealthCheckApiController>(HealthCheckApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.healthcheck()).toBe('database');
    });
  });
});
