import { AccountRepositoryInterface } from '@app/data/protocols/account/account-repository.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { ILogger } from '@app/domain/logger/logger.interface';
import { AccountMapper } from '@app/presentation/mappers/account/account.mapper';
import { ResponseAccountType } from '@app/presentation/types/account/response-account.type';

export class FindAccountsUseCase {
  constructor(
    private readonly accountRepo: AccountRepositoryInterface,
    private readonly exception: ExceptionInterface,
    private readonly logger: ILogger,
  ) {}

  public async execute(): Promise<ResponseAccountType[]> {
    const accounts = await this.accountRepo.find();

    if (!accounts.length) {
      this.exception.notFoundException({ message: 'No record found.' });
    }
    const accountMapped = AccountMapper.toAccounts(accounts);
    this.logger.log('FindAccountsUseCase', `Returning all accounts`);
    return accountMapped;
  }
}
