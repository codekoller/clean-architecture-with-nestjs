import { AuthInputDto } from '@app/presentation/dtos/auth/auth-input.dto';
import { AuthOutputDto } from '@app/presentation/dtos/auth/auth-output.dto';
import { SignInUseCase } from '@app/usecases/auth/sign-in.usecase';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}
  @Post('sign-in')
  async signIn(@Body() authInputDto: AuthInputDto): Promise<AuthOutputDto> {
    return await this.signInUseCase.signIn(authInputDto);
  }
}
