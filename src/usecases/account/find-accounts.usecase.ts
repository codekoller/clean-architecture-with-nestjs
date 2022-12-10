import { AccountRepositoryInterface } from '@app/data/protocols/account/add-account-repository.interface';
import { ExceptionsService } from '@app/infra/exceptions/exceptions.service';
import { AccountMapper } from '@app/presentation/mappers/account/account.mapper';
import { ResponseAccountType } from '@app/presentation/types/account/response-account.type';

export class FindAccountsUseCase {
  constructor(
    private readonly accountRepo: AccountRepositoryInterface,
    private readonly exceptionService: ExceptionsService,
  ) {}

  public async execute(): Promise<ResponseAccountType[]> {
    const accounts = await this.accountRepo.find();

    if (!accounts.length) {
      this.exceptionService.notFoundException({ message: 'No record found.' });
    }

    return AccountMapper.toAccounts(accounts);
  }
}
