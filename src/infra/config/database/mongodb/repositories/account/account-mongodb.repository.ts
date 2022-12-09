import { AddAccountRepositoryInterface } from '@app/data/protocols/account/add-account-repository.interface';
import { AccountModel } from '@app/infra/config/database/mongodb/models/account/account.model';
import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class AccountMongodbRepository implements AddAccountRepositoryInterface {
  constructor(
    @InjectModel(AccountModel.name)
    private readonly mongoHelper: Model<AccountModel>,
  ) {}
  async add(data: AddAccountDto): Promise<AccountModel> {
    const accountCreated = new this.mongoHelper(data);
    return await accountCreated.save();
  }
}
