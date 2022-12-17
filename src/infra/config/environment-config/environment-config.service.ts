import { JwtSecretInterface } from '@app/domain/cryptography/jwt-secret.interface';
import { DatabaseConfigInterface } from '@app/domain/database/database-config.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfigInterface, JwtSecretInterface
{
  constructor(private readonly config: ConfigService) {}
  getDatabaseUri(): string {
    return this.config.get<string>('mongodbUri');
  }

  getJwtSecret(): string {
    return this.config.get<string>('jwtSecret');
  }
}
