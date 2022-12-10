import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdentifyAccountDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
