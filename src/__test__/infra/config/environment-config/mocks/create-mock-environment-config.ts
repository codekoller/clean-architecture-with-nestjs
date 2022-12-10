import { EnvironmentConfigService } from '@app/infra/config/environment-config/environment-config.service';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

export const CreateMockEnvironmentConfig = async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),
    ],
    providers: [EnvironmentConfigService],
  }).compile();

  return {
    service: moduleRef.get<EnvironmentConfigService>(EnvironmentConfigService),
  };
};
