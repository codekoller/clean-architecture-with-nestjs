import { AuthOutputDto } from '@app/presentation/dtos/auth/auth-output.dto';

export abstract class AuthMapper {
  static toAuth(token: string): AuthOutputDto {
    return {
      accessToken: token,
    };
  }
}
