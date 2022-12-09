import { AccountModel } from '@app/infra/config/database/mongodb/models/account/account.model';
import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';

export interface AddAccountRepositoryInterface {
  add(data: AddAccountDto): Promise<AccountModel>;
}
