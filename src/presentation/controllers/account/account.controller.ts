import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';
import { ResponseAccountType } from '@app/presentation/types/account/response-account.type';
import { AddAccountUseCase } from '@app/usecases/account/add-account.usecase';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('accounts')
export class AccountController {
  constructor(private readonly addAccountUseCase: AddAccountUseCase) {}

  @Post()
  public async add(@Body() data: AddAccountDto): Promise<ResponseAccountType> {
    return await this.addAccountUseCase.execute(data);
  }
}
