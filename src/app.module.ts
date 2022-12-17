import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LogsMiddleware } from './infra/common/middleware/logs.middleware';
import { EnvironmentConfigModule } from './infra/config/environment-config/environment-config.module';
import { CryptographyModule } from './infra/cryptography/cryptography.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { AccountModule } from './infra/ioc/account.module';
import { AuthModule } from './infra/ioc/auth.module';
import { LoggerModule } from './infra/logger/logger.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    LoggerModule,
    ExceptionsModule,
    AccountModule,
    CryptographyModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
