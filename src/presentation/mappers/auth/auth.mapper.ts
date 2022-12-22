import { AuthOutputDto } from '@app/presentation/dtos/auth/auth-output.dto';

export abstract class AuthMapper {
  static toAuth(accessToken: string, refreshToken: string): AuthOutputDto {
    return {
      accessToken,
      refreshToken,
    };
  }
}
