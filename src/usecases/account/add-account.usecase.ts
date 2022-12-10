import { AccountRepositoryInterface } from '@app/data/protocols/account/add-account-repository.interface';
import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';
import { AccountMapper } from '@app/presentation/mappers/account/account.mapper';
import { ResponseAccountType } from '@app/presentation/types/account/response-account.type';
import { ConflictException } from '@nestjs/common';

export class AddAccountUseCase {
  constructor(private readonly accountRepo: AccountRepositoryInterface) {}

  public async execute(data: AddAccountDto): Promise<ResponseAccountType> {
    const account = await this.accountRepo.findByEmail(data.email);

    if (account) {
      throw new ConflictException(
        'There is already an account with this email.',
      );
    }

    const accountCreated = await this.accountRepo.add(data);
    return AccountMapper.toAccount(accountCreated);
  }
}
