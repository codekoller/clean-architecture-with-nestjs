import { BcryptAdapterInterface } from '@app/domain/adapters/bcrypt-adapter.interface';
import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class BcryptAdapter implements BcryptAdapterInterface {
  public async hash(plaintext: string): Promise<string> {
    return hashSync(plaintext, genSaltSync());
  }

  public async compare(plaintext: string, digest: string): Promise<boolean> {
    return compareSync(plaintext, digest);
  }
}
