import { AuthInputDto } from '@app/presentation/dtos/auth/auth-input.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('sign-in')
  signIn(@Body() authInputDto: AuthInputDto) {
    return authInputDto;
  }
}
