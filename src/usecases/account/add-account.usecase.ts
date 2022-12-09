import { AddAccountRepositoryInterface } from '@app/data/protocols/account/add-account-repository.interface';
import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';
import { AccountMapper } from '@app/presentation/mappers/account/account.mapper';
import { ResponseAccountType } from '@app/presentation/types/account/response-account.type';

export class AddAccountUseCase {
  constructor(private readonly addAccountRepo: AddAccountRepositoryInterface) {}

  public async execute(data: AddAccountDto): Promise<ResponseAccountType> {
    const account = await this.addAccountRepo.add(data);
    return AccountMapper.toAccount(account);
  }
}
