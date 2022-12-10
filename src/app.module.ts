import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigModule } from './infra/config/environment-config/environment-config.module';
import { CryptographyModule } from './infra/cryptography/cryptography.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { AccountModule } from './infra/ioc/account.module';
import { LoggerModule } from './infra/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EnvironmentConfigModule,
    LoggerModule,
    ExceptionsModule,
    AccountModule,
    CryptographyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
