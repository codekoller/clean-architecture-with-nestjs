import { ExceptionsService } from '@app/infra/exceptions/exceptions.service';
import { LoggerService } from '@app/infra/logger/logger.service';
import { ValidateUserForLocalStrategyUseCase } from '@app/usecases/auth/validate-user-for-local-stragtegy.usecase';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthInputDto } from '../dtos/auth/auth-input.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
    private readonly validateUserForLocalStrategyUseCase: ValidateUserForLocalStrategyUseCase,
  ) {
    super();
  }

  async validate(authInputDto: AuthInputDto) {
    const account = await this.validateUserForLocalStrategyUseCase.execute(
      authInputDto,
    );
    if (!account) {
      this.logger.warn('LocalStrategy', `Invalid credentials`);
      this.exceptionService.unauthorizedException({
        message: 'Invalid credentials.',
      });
    }
    return account;
  }
}
