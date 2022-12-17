import { AccountRepositoryInterface } from '@app/data/protocols/account/account-repository.interface';
import { BcryptAdapterInterface } from '@app/domain/cryptography/bcrypt-adapter.interface';
import { JwtAdapterInterface } from '@app/domain/cryptography/jwt-adapter.interface';
import { AuthInputDto } from '@app/presentation/dtos/auth/auth-input.dto';
import { AuthOutputDto } from '@app/presentation/dtos/auth/auth-output.dto';
import { AuthMapper } from '@app/presentation/mappers/auth/auth.mapper';
import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class SignInUseCase {
  private logger = new Logger(SignInUseCase.name);
  constructor(
    private readonly accountRepo: AccountRepositoryInterface,
    private readonly bcryptAdapter: BcryptAdapterInterface,
    private readonly jwtAdapter: JwtAdapterInterface,
  ) {}
  async signIn(data: AuthInputDto): Promise<AuthOutputDto> {
    const accountExists = await this.accountRepo.findByEmail(data.email);

    if (!accountExists) {
      throw new NotFoundException('Account not found.');
    }

    const isValid = await this.bcryptAdapter.compare(
      data.password,
      accountExists.password,
    );

    this.logger.log(`${JSON.stringify(data)}`);
    this.logger.log(`${JSON.stringify(accountExists)}`);
    this.logger.log(`${JSON.stringify(isValid)}`);

    if (!isValid) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const accessToken = await this.jwtAdapter.encrypt(accountExists);

    return AuthMapper.toAuth(accessToken);
  }
}
