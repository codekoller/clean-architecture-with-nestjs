import { AccountModel } from '@app/infra/database/mongodb/models/account/account.model';
import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';

export interface AccountRepositoryInterface {
  add(data: AddAccountDto): Promise<AccountModel>;
  findByEmail(email: string): Promise<AccountModel>;
  find(): Promise<AccountModel[]>;
  findById(id: string): Promise<AccountModel>;
  findByName(name: string): Promise<AccountModel>;
  updateLastLogin(accountId: string): Promise<void>;
  updateRefreshToken(accountId: string, refreshToken: string): Promise<void>;
}
