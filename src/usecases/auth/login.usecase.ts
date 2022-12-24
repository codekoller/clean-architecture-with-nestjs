import { AccountRepositoryInterface } from '@app/data/protocols/account/account-repository.interface';
import { BcryptAdapterInterface } from '@app/domain/cryptography/bcrypt-adapter.interface';
import { JwtAdapterInterface } from '@app/domain/cryptography/jwt-adapter.interface';
import { ILogger } from '@app/domain/logger/logger.interface';
import { AuthInputDto } from '@app/presentation/dtos/auth/auth-input.dto';
import { AuthOutputDto } from '@app/presentation/dtos/auth/auth-output.dto';
import { AuthMapper } from '@app/presentation/mappers/auth/auth.mapper';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class LoginUseCase {
  constructor(
    private readonly accountRepo: AccountRepositoryInterface,
    private readonly bcryptAdapter: BcryptAdapterInterface,
    private readonly jwtAdapter: JwtAdapterInterface,
    private readonly logger: ILogger,
  ) {}
  async execute(data: AuthInputDto): Promise<AuthOutputDto> {
    const accountExists = await this.accountRepo.findByEmail(data.email);

    if (!accountExists) {
      throw new NotFoundException('Account not found.');
    }

    const isValid = await this.bcryptAdapter.compare(
      data.password,
      accountExists.password,
    );

    if (!isValid) {
      this.logger.warn('UnauthorizedException', 'Incorrect email or password.');
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const accessToken = await this.jwtAdapter.encrypt(accountExists);

    const refreshToken = await this.jwtAdapter.encryptRefreshToken(
      accessToken,
      accountExists,
    );

    this.logger.log('LoginUseCase', 'Account logged');

    return AuthMapper.toAuth(accessToken, refreshToken);
  }
}
