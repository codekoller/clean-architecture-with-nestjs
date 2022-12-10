import { AccountModel } from '@app/infra/config/database/mongodb/models/account/account.model';
import { ResponseAccountType } from '@app/presentation/types/account/response-account.type';

export abstract class AccountMapper {
  static toAccount(account: AccountModel): ResponseAccountType {
    return {
      id: account._id,
      fullName: `${account.name} ${account.surname}`,
      age: account.age,
      email: account.email,
      password: account.password,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }

  static toAccounts(accounts: AccountModel[]): ResponseAccountType[] {
    return accounts.map(this.toAccount);
  }
}
