import { AccountRepositoryInterface } from '@app/data/protocols/account/account-repository.interface';
import { BcryptAdapterInterface } from '@app/domain/adapters/bcrypt-adapter.interface';
import { ExceptionInterface } from '@app/domain/exceptions/exception.interface';
import { ILogger } from '@app/domain/logger/logger.interface';
import { AccountController } from '@app/presentation/controllers/account/account.controller';
import { AddAccountUseCase } from '@app/usecases/account/add-account.usecase';
import { FindAccountByIdUseCase } from '@app/usecases/account/find-account-by-id.usecase';
import { FindAccountsUseCase } from '@app/usecases/account/find-accounts.usecase';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountMongodbRepository } from '../database/mongodb/repositories/account/account-mongodb.repository';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { BcryptAdapter } from '../cryptography/bcrypt/bcrypt-adapter';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    ExceptionsModule,
    CryptographyModule,
    EnvironmentConfigModule,
  ],
  providers: [
    {
      provide: AddAccountUseCase,
      useFactory(
        accountRepo: AccountRepositoryInterface,
        bcryptAdapter: BcryptAdapterInterface,
        exception: ExceptionInterface,
        logger: ILogger,
      ) {
        return new AddAccountUseCase(
          accountRepo,
          bcryptAdapter,
          exception,
          logger,
        );
      },
      inject: [
        AccountMongodbRepository,
        BcryptAdapter,
        ExceptionsService,
        LoggerService,
      ],
    },
    {
      provide: FindAccountsUseCase,
      useFactory(
        accountRepo: AccountRepositoryInterface,
        exception: ExceptionInterface,
        logger: ILogger,
      ) {
        return new FindAccountsUseCase(accountRepo, exception, logger);
      },
      inject: [AccountMongodbRepository, ExceptionsService, LoggerService],
    },
    {
      provide: FindAccountByIdUseCase,
      useFactory(
        accountRepo: AccountRepositoryInterface,
        exception: ExceptionInterface,
        logger: ILogger,
      ) {
        return new FindAccountByIdUseCase(accountRepo, exception, logger);
      },
      inject: [AccountMongodbRepository, ExceptionsService, LoggerService],
    },
  ],
  controllers: [AccountController],
})
export class AccountModule {}
