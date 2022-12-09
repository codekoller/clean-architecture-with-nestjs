import {
  AccountModel,
  AccountSchema,
} from '@app/infra/config/database/mongodb/models/account/account.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbModule } from './mongodb/mongodb.module';
import { AccountMongodbRepository } from './mongodb/repositories/account/account-mongodb.repository';

@Module({
  imports: [
    MongodbModule,
    MongooseModule.forFeature([
      {
        name: AccountModel.name,
        schema: AccountSchema,
      },
    ]),
  ],
  providers: [AccountMongodbRepository],
  exports: [AccountMongodbRepository],
})
export class DatabaseModule {}
