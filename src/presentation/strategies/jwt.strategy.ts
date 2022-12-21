import { AccountModel } from '@app/infra/database/mongodb/models/account/account.model';
import { AccountMongodbRepository } from '@app/infra/database/mongodb/repositories/account/account-mongodb.repository';
import { LoggerService } from '@app/infra/logger/logger.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPayloadType } from '../types/auth/auth-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly accountRepo: AccountMongodbRepository,
    private readonly logger: LoggerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(
    authPayloadType: AuthPayloadType,
  ): Promise<AccountModel> {
    this.logger.log('JwtStrategy', `${JSON.stringify(authPayloadType)}`);
    const account = await this.accountRepo.findById(authPayloadType.id);

    const validUser = async (): Promise<boolean> =>
      account._id == authPayloadType.id;

    if (!account && validUser()) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
