import { AccountRepositoryInterface } from '@app/data/protocols/account/account-repository.interface';
import { BcryptAdapterInterface } from '@app/domain/adapters/bcrypt-adapter.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { ILogger } from '@app/domain/logger/logger.interface';
import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';
import { AccountMapper } from '@app/presentation/mappers/account/account.mapper';
import { ResponseAccountType } from '@app/presentation/types/account/response-account.type';

export class AddAccountUseCase {
  constructor(
    private readonly accountRepo: AccountRepositoryInterface,
    private readonly bcryptAdapter: BcryptAdapterInterface,
    private readonly exceptionService: ExceptionInterface,
    private readonly logger: ILogger,
  ) {}

  public async execute(data: AddAccountDto): Promise<ResponseAccountType> {
    const account = await this.accountRepo.findByEmail(data.email);

    const newAccountWithHash = {
      ...data,
      password: await this.bcryptAdapter.hash(data.password),
    };

    if (account) {
      this.exceptionService.conflictException({
        message: 'There is already an account with this email.',
      });
    }

    const accountCreated = await this.accountRepo.add(newAccountWithHash);
    const accountMapped = AccountMapper.toAccount(accountCreated);

    this.logger.log(
      'AddAccountUseCase',
      `A new account has been created: ${accountMapped}`,
    );
    return accountMapped;
  }
}
