import { BcryptAdapterInterface } from '@app/domain/adapters/bcrypt-adapter.interface';
import { EnvironmentConfigService } from '@app/infra/config/environment-config/environment-config.service';
import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class BcryptAdapter implements BcryptAdapterInterface {
  constructor(private readonly envService: EnvironmentConfigService) {}

  public async hash(hash: string): Promise<string> {
    return hashSync(hash, genSaltSync());
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return compareSync(password, hash);
  }
}
