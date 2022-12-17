import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { BcryptAdapter } from './bcrypt/bcrypt-adapter';
import { JwtAdapter } from './jwt/jwt-adapter';

@Module({
  providers: [BcryptAdapter, JwtAdapter, EnvironmentConfigService],
  exports: [BcryptAdapter, JwtAdapter],
})
export class CryptographyModule {}
