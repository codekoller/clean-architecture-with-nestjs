import { JwtInterface } from '@app/domain/cryptography/jwt-interface';
import { EnvironmentConfigService } from '@app/infra/config/environment-config/environment-config.service';
import { AccountModel } from '@app/infra/database/mongodb/models/account/account.model';
import { VerifyTokenDto } from '@app/presentation/dtos/auth/verify-token.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAdapter implements JwtInterface {
  constructor(
    private readonly jwtService: JwtService,
    private readonly environmentService: EnvironmentConfigService,
  ) {}

  public async encrypt(account: AccountModel): Promise<string> {
    const jwtPayload = {
      id: account._id,
      name: account.name,
      surname: account.surname,
      email: account.email,
    };
    return this.jwtService.signAsync(jwtPayload, {
      secret: this.environmentService.getJwtSecret(),
    });
  }

  public async decrypt(token: string): Promise<VerifyTokenDto> {
    return this.jwtService.verifyAsync(token, {
      secret: this.environmentService.getJwtSecret(),
    });
  }
}
