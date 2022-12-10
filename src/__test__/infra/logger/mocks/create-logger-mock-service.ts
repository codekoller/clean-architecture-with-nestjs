import { LoggerService } from '@app/infra/logger/logger.service';
import { Test } from '@nestjs/testing';

export const createLoggerMockService = async () => {
  const moduleRef = await Test.createTestingModule({
    providers: [LoggerService],
  }).compile();

  return {
    service: moduleRef.get<LoggerService>(LoggerService),
  };
};
