import { AccountModel } from '@app/infra/config/database/mongodb/models/account/account.model';
import { AccountMongodbRepository } from '@app/infra/config/database/mongodb/repositories/account/account-mongodb.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';

describe('AccountMongodbRepository ', () => {
  let accountMongodbRepository: AccountMongodbRepository;
  let mockAccountModel: Model<AccountModel>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(AccountModel.name),
          useValue: Model,
        },
        AccountMongodbRepository,
      ],
    }).compile();

    accountMongodbRepository = module.get<AccountMongodbRepository>(
      AccountMongodbRepository,
    );

    mockAccountModel = module.get<Model<AccountModel>>(
      getModelToken(AccountModel.name),
    );
  });

  it('should be defined accountMongodbRepository', () => {
    expect(accountMongodbRepository).toBeDefined();
  });
  it('should be defined accountModel', () => {
    expect(mockAccountModel).toBeDefined();
  });

  it('should be called create with correct params', async () => {
    const createUserDTO = {
      name: 'any_name',
      surname: 'any_surname',
      age: 23,
      email: 'any_email@mail.com',
      password: 'any_password',
    };
    const spy = jest.spyOn(mockAccountModel, 'create').mockReturnValue();
    await accountMongodbRepository.add(createUserDTO);
    expect(spy).toBeCalled();
  });
});
