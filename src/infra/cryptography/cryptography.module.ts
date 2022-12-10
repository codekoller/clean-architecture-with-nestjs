import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { BcryptAdapter } from './bcrypt/bcrypt-adapter';

@Module({
  providers: [BcryptAdapter, EnvironmentConfigService],
  exports: [BcryptAdapter],
})
export class CryptographyModule {}
