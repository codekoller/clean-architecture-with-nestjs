import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthInputDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 14)
  password: string;
}
