import { EnvironmentConfigService } from '../../../../infra/config/environment-config/environment-config.service';
import { CreateMockEnvironmentConfig } from './mocks/create-mock-environment-config';

describe('EnvironmentConfigService', () => {
  let service: EnvironmentConfigService;

  beforeEach(async () => {
    const module = await CreateMockEnvironmentConfig();

    service = module.service;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get database uri', () => {
    const result = service.getDatabaseUri();
    jest.spyOn(service, 'getDatabaseUri').mockImplementation(() => result);

    expect(service.getDatabaseUri()).toBe(result);
  });
});
