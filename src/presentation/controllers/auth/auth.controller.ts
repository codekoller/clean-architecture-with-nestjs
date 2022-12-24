import { AuthInputDto } from '@app/presentation/dtos/auth/auth-input.dto';
import { AuthOutputDto } from '@app/presentation/dtos/auth/auth-output.dto';
import { LogoutUseCases } from '@app/usecases/auth/logout.usecase';
import { LoginUseCase } from '@app/usecases/auth/login.usecase';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@app/presentation/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCases,
  ) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() authInputDto: AuthInputDto,
    @Req() request: Request,
  ): Promise<AuthOutputDto> {
    const { accessToken, refreshToken } = await this.loginUseCase.execute(
      authInputDto,
    );
    request.res.setHeader('accessToken', [accessToken]);
    request.res.setHeader('refreshToken', [refreshToken]);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@Req() request: Request): Promise<{ message: string }> {
    const cookie = await this.logoutUseCase.execute();
    request.res.setHeader('accessToken', cookie);
    return {
      message: 'Logout successful',
    };
  }
}
