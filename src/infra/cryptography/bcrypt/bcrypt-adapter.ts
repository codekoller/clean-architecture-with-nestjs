import { BcryptAdapterInterface } from '@app/domain/adapters/bcrypt-adapter.interface';
import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class BcryptAdapter implements BcryptAdapterInterface {
  public async hash(hash: string): Promise<string> {
    return hashSync(hash, genSaltSync());
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return compareSync(password, hash);
  }
}
