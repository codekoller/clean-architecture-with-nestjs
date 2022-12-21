import { AccountRepositoryInterface } from '@app/data/protocols/account/account-repository.interface';
import { BcryptAdapterInterface } from '@app/domain/adapters/bcrypt-adapter.interface';
import { JwtAdapterInterface } from '@app/domain/cryptography/jwt-adapter.interface';
import { AuthController } from '@app/presentation/controllers/auth/auth.controller';
import { JwtStrategy } from '@app/presentation/strategies/jwt.strategy';
import { SignInUseCase } from '@app/usecases/auth/sign-in.usecase';
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
        defaultStrategy: configService.get<string>('passport.defaultStrategy'),
        property: configService.get<string>('passport.property'),
        session: configService.get<string>('passport.session'),
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: SignInUseCase,
      useFactory(
        accountRepo: AccountRepositoryInterface,
        bcryptAdapter: BcryptAdapterInterface,
        jwtAdapter: JwtAdapterInterface,
      ) {
        return new SignInUseCase(accountRepo, bcryptAdapter, jwtAdapter);
      },
      inject: [AccountMongodbRepository, BcryptAdapter, JwtAdapter],
    },
    JwtStrategy,
    LoggerService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
