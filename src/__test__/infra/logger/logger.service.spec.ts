import { LoggerService } from '../../../infra/logger/logger.service';
import { createLoggerMockService } from './mocks/create-logger-mock-service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module = await createLoggerMockService();

    service = module.service;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be call debug', () => {
    const result = service.debug('any', 'any');
    jest.spyOn(service, 'debug').mockImplementation(() => result);

    expect(service.debug('any', 'any')).toBe(result);
  });

  it('should be call log', () => {
    const result = service.log('any', 'any');
    jest.spyOn(service, 'log').mockImplementation(() => result);
    expect(service.log('any', 'any')).toBe(result);
  });

  it('should be call error', () => {
    const result = service.error('any', 'any');
    jest.spyOn(service, 'error').mockImplementation(() => result);
    expect(service.error('any', 'any')).toBe(result);
  });

  it('should be call warn', () => {
    const result = service.warn('any', 'any');
    jest.spyOn(service, 'warn').mockImplementation(() => result);
    expect(service.warn('any', 'any')).toBe(result);
  });

  it('should be call verbose', () => {
    const result = service.verbose('any', 'any');
    jest.spyOn(service, 'verbose').mockImplementation(() => result);
    expect(service.verbose('any', 'any')).toBe(result);
  });
});
