import { AccountRepositoryInterface } from '@app/data/protocols/account/add-account-repository.interface';
import { AccountController } from '@app/presentation/controllers/account/account.controller';
import { AddAccountUseCase } from '@app/usecases/account/add-account.usecase';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../config/database/database.module';
import { AccountMongodbRepository } from '../config/database/mongodb/repositories/account/account-mongodb.repository';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, DatabaseModule, ExceptionsModule],
  providers: [
    {
      provide: AddAccountUseCase,
      useFactory(accountRepo: AccountRepositoryInterface) {
        return new AddAccountUseCase(accountRepo);
      },
      inject: [AccountMongodbRepository],
    },
  ],
  controllers: [AccountController],
})
export class AccountModule {}
