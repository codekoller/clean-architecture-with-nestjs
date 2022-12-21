import { AccountRepositoryInterface } from '@app/data/protocols/account/account-repository.interface';
import { BcryptAdapterInterface } from '@app/domain/adapters/bcrypt-adapter.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { AccountMapper } from '@app/presentation/mappers/account/account.mapper';

export class IdentifyUserIfRefreshTokenMatchesUseCase {
  constructor(
    private readonly accountRepo: AccountRepositoryInterface,
    private readonly exception: ExceptionInterface,
    private readonly bcryptAdapter: BcryptAdapterInterface,
  ) {}
  async execute(refreshToken: string, username: string) {
    const account = await this.accountRepo.findByName(username);
    if (!account) {
      this.exception.notFoundException({ message: 'Account not found' });
    }

    const isValid = await this.bcryptAdapter.compare(
      refreshToken,
      account.password,
    );

    if (!isValid) {
      this.exception.unauthorizedException({
        message: 'Incorrect email or password',
      });
    }

    return AccountMapper.toAccount(account);
  }
}
