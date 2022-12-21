import { AccountRepositoryInterface } from '@app/data/protocols/account/account-repository.interface';
import { BcryptAdapterInterface } from '@app/domain/adapters/bcrypt-adapter.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { AuthInputDto } from '@app/presentation/dtos/auth/auth-input.dto';
import { AccountMapper } from '@app/presentation/mappers/account/account.mapper';

export class ValidateUserForLocalStrategyUseCase {
  constructor(
    private readonly accountRepo: AccountRepositoryInterface,
    private readonly exception: ExceptionInterface,
    private readonly bcryptAdapter: BcryptAdapterInterface,
  ) {}

  async execute(authInputDto: AuthInputDto) {
    const account = await this.accountRepo.findByEmail(authInputDto.email);

    if (!account) {
      this.exception.notFoundException({ message: 'Account not found.' });
    }

    const isValid = await this.bcryptAdapter.compare(
      authInputDto.password,
      account.password,
    );

    if (!isValid) {
      this.exception.unauthorizedException({
        message: 'Incorrect credentials',
      });
    }

    return AccountMapper.toAccount(account);
  }
}
