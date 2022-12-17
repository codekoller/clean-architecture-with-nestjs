import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { BcryptAdapter } from './bcrypt/bcrypt-adapter';
import { JwtAdapter } from './jwt/jwt-adapter';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [BcryptAdapter, JwtAdapter, JwtService],
  exports: [BcryptAdapter, JwtAdapter],
})
export class CryptographyModule {}
