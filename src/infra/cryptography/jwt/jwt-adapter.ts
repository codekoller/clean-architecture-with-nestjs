import { JwtAdapterInterface } from '@app/domain/cryptography/jwt-adapter.interface';
import { EnvironmentConfigService } from '@app/infra/config/environment-config/environment-config.service';
import { AccountModel } from '@app/infra/database/mongodb/models/account/account.model';
import { VerifyTokenDto } from '@app/presentation/dtos/auth/verify-token.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAdapter implements JwtAdapterInterface {
  constructor(
    private readonly jwtService: JwtService,
    private readonly environmentService: EnvironmentConfigService,
  ) {}

  public async encrypt(account: AccountModel): Promise<string> {
    const jwtPayload = {
      id: account._id,
      name: account.name,
      surname: account.surname,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
    return this.jwtService.signAsync(jwtPayload, {
      secret: this.environmentService.getJwtSecret(),
      expiresIn: this.environmentService.getExpiresIn(),
      algorithm: 'HS512',
    });
  }

  public async decrypt(token: string): Promise<VerifyTokenDto> {
    return this.jwtService.verifyAsync(token, {
      secret: this.environmentService.getJwtSecret(),
      algorithms: ['HS512'],
    });
  }

  public async encryptRefreshToken(
    token: string,
    account: AccountModel,
  ): Promise<string> {
    const jwtRefreshToken = {
      _id: account._id,
      name: account.name,
      surname: account.surname,
      age: account.age,
      email: account.email,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      token,
    };

    return this.jwtService.signAsync(jwtRefreshToken, {
      secret: this.environmentService.getJwtRefreshToken(),
      expiresIn: this.environmentService.getJwtRefreshTokenExpirationTime(),
      algorithm: 'HS512',
    });
  }
}
