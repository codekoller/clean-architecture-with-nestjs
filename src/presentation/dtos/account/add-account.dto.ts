import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @Type(() => Number)
  age: number;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 14)
  password: string;
}
