import { AccountRepositoryInterface } from '@app/data/protocols/account/account-repository.interface';
import { BcryptAdapterInterface } from '@app/domain/adapters/bcrypt-adapter.interface';
import { JwtAdapterInterface } from '@app/domain/cryptography/jwt-adapter.interface';
import { ILogger } from '@app/domain/logger/logger.interface';
import { AuthController } from '@app/presentation/controllers/auth/auth.controller';
import { JwtStrategy } from '@app/presentation/strategies/jwt.strategy';
import { LoginUseCase } from '@app/usecases/auth/login.usecase';
import { LogoutUseCases } from '@app/usecases/auth/logout.usecase';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { BcryptAdapter } from '../cryptography/bcrypt/bcrypt-adapter';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { JwtAdapter } from '../cryptography/jwt/jwt-adapter';
import { DatabaseModule } from '../database/database.module';
import { AccountMongodbRepository } from '../database/mongodb/repositories/account/account-mongodb.repository';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    EnvironmentConfigModule,
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        defaultStrategy: configService.get<string>('DEFAULT_STRATEGY'),
        property: configService.get<string>('PROPERTY'),
        session: configService.get<string>('SESSION'),
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: LoginUseCase,
      useFactory(
        accountRepo: AccountRepositoryInterface,
        bcryptAdapter: BcryptAdapterInterface,
        jwtAdapter: JwtAdapterInterface,
        logger: ILogger,
      ) {
        return new LoginUseCase(accountRepo, bcryptAdapter, jwtAdapter, logger);
      },
      inject: [
        AccountMongodbRepository,
        BcryptAdapter,
        JwtAdapter,
        LoggerService,
      ],
    },
    {
      provide: LogoutUseCases,
      useClass: LogoutUseCases,
    },
    JwtStrategy,
    LoggerService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
