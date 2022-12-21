import { EnvironmentConfigService } from '@app/infra/config/environment-config/environment-config.service';
import { ExceptionsService } from '@app/infra/exceptions/exceptions.service';
import { LoggerService } from '@app/infra/logger/logger.service';
import { IdentifyUserIfRefreshTokenMatchesUseCase } from '@app/usecases/auth/identify-user-if-refresh-token-matches.usecase';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
    private readonly identifyUserIfRefreshTokenUseCase: IdentifyUserIfRefreshTokenMatchesUseCase,
    private _environmentService: EnvironmentConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: _environmentService.getJwtRefreshToken(),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, name: string) {
    const refreshToken = request.cookies?.Refresh;
    const account = await this.identifyUserIfRefreshTokenUseCase.execute(
      refreshToken,
      name,
    );

    if (!account) {
      this.logger.warn('JwtStrategy', `User not found or hash not correct`);
      this.exceptionService.unauthorizedException({
        message: 'User not found or hash not correct',
      });
    }

    return account;
  }
}
