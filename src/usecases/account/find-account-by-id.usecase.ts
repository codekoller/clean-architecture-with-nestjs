import { AccountRepositoryInterface } from '@app/data/protocols/account/add-account-repository.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { ILogger } from '@app/domain/logger/logger.interface';
import { IdentifyAccountDto } from '@app/presentation/dtos/account/identify-account.dto';
import { AccountMapper } from '@app/presentation/mappers/account/account.mapper';
import { ResponseAccountType } from '@app/presentation/types/account/response-account.type';

export class FindAccountByIdUseCase {
  constructor(
    private readonly accountRepo: AccountRepositoryInterface,
    private readonly exception: ExceptionInterface,
    private readonly logger: ILogger,
  ) {}

  public async execute(data: IdentifyAccountDto): Promise<ResponseAccountType> {
    const account = await this.accountRepo.findById(data.id);

    if (!account)
      this.exception.notFoundException({
        message: 'Account not found.',
      });

    const accountMapped = AccountMapper.toAccount(account);
    this.logger.log(
      'FindAccountByIdUseCase',
      `Returning the account with the id: ${accountMapped.id}`,
    );
    return accountMapped;
  }
}
