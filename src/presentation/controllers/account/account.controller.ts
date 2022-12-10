import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';
import { ResponseAccountType } from '@app/presentation/types/account/response-account.type';
import { AddAccountUseCase } from '@app/usecases/account/add-account.usecase';
import { FindAccountsUseCase } from '@app/usecases/account/find-accounts.usecase';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly addAccountUseCase: AddAccountUseCase,
    private readonly findAccountsUseCase: FindAccountsUseCase,
  ) {}

  @Post()
  public async add(@Body() data: AddAccountDto): Promise<ResponseAccountType> {
    return await this.addAccountUseCase.execute(data);
  }

  @Get()
  public async find(): Promise<ResponseAccountType[]> {
    return await this.findAccountsUseCase.execute();
  }
}
