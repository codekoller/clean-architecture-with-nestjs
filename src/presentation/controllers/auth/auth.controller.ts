import { AuthInputDto } from '@app/presentation/dtos/auth/auth-input.dto';
import { AuthOutputDto } from '@app/presentation/dtos/auth/auth-output.dto';
import { LogoutUseCases } from '@app/usecases/auth/logout.usecase';
import { LoginUseCase } from '@app/usecases/auth/login.usecase';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCases,
  ) {}
  @Post('login')
  async login(@Body() authInputDto: AuthInputDto): Promise<AuthOutputDto> {
    return await this.loginUseCase.execute(authInputDto);
  }

  @Post('logout')
  async logout(@Req() request: Request): Promise<{ message: string }> {
    const cookie = await this.logoutUseCase.execute();
    request.res.setHeader('Set-Cookie', cookie);
    return {
      message: 'Logout successful',
    };
  }
}
