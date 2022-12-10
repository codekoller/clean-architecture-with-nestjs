import { AccountRepositoryInterface } from '@app/data/protocols/account/add-account-repository.interface';
import { ExceptionsService } from '@app/infra/exceptions/exceptions.service';
import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';
import { AccountMapper } from '@app/presentation/mappers/account/account.mapper';
import { ResponseAccountType } from '@app/presentation/types/account/response-account.type';

export class AddAccountUseCase {
  constructor(
    private readonly accountRepo: AccountRepositoryInterface,
    private readonly exceptionService: ExceptionsService,
  ) {}

  public async execute(data: AddAccountDto): Promise<ResponseAccountType> {
    const account = await this.accountRepo.findByEmail(data.email);

    if (account) {
      this.exceptionService.conflictException({
        message: 'There is already an account with this email.',
      });
    }

    const accountCreated = await this.accountRepo.add(data);
    return AccountMapper.toAccount(accountCreated);
  }
}
