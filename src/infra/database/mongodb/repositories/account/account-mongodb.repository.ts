import { AccountRepositoryInterface } from '@app/data/protocols/account/account-repository.interface';
import { AccountModel } from '@app/infra/database/mongodb/models/account/account.model';
import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class AccountMongodbRepository implements AccountRepositoryInterface {
  constructor(
    @InjectModel(AccountModel.name)
    private readonly mongoHelper: Model<AccountModel>,
  ) {}
  public async add(data: AddAccountDto): Promise<AccountModel> {
    const newAccount = Object.assign({} as AddAccountDto, data);
    const accountCreated = await this.mongoHelper.create(newAccount);
    return accountCreated;
  }

  public async findByEmail(email: string): Promise<AccountModel> {
    return await this.mongoHelper.findOne({
      email: { $eq: email },
    });
  }

  public async find(): Promise<AccountModel[]> {
    return await this.mongoHelper.find();
  }

  public async findById(id: string): Promise<AccountModel> {
    return await this.mongoHelper.findOne({
      _id: { $eq: id },
    });
  }

  public async findByName(name: string): Promise<AccountModel> {
    return await this.mongoHelper.findOne({
      name: { $eq: name },
    });
  }
}
