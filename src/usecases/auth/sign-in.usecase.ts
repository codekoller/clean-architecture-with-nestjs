import { AccountRepositoryInterface } from '@app/data/protocols/account/account-repository.interface';
import { BcryptInterface } from '@app/domain/cryptography/bcrypt.interface';
import { JwtInterface } from '@app/domain/cryptography/jwt-interface';
import { AuthInputDto } from '@app/presentation/dtos/auth/auth-input.dto';
import { AuthOutputDto } from '@app/presentation/dtos/auth/auth-output.dto';
import { AuthMapper } from '@app/presentation/mappers/auth/auth.mapper';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class SignInUseCase {
  constructor(
    private readonly accountRepo: AccountRepositoryInterface,
    private readonly bcrypt: BcryptInterface,
    private readonly jwt: JwtInterface,
  ) {}
  async signIn(data: AuthInputDto): Promise<AuthOutputDto> {
    const accountExists = await this.accountRepo.findByEmail(data.email);

    if (!accountExists) {
      throw new NotFoundException('Account not found.');
    }

    const isValid = await this.bcrypt.compare(
      data.password,
      accountExists.password,
    );

    if (!isValid) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const accessToken = await this.jwt.encrypt(accountExists);

    return AuthMapper.toAuth(accessToken);
  }
}
