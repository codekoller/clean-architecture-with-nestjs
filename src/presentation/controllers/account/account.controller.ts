import { AddAccountDto } from '@app/presentation/dtos/account/add-account.dto';
import { IdentifyAccountDto } from '@app/presentation/dtos/account/identify-account.dto';
import { ResponseAccountType } from '@app/presentation/types/account/response-account.type';
import { AddAccountUseCase } from '@app/usecases/account/add-account.usecase';
import { FindAccountByIdUseCase } from '@app/usecases/account/find-account-by-id.usecase';
import { FindAccountsUseCase } from '@app/usecases/account/find-accounts.usecase';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/presentation/guards/jwt-auth.guard';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly addAccountUseCase: AddAccountUseCase,
    private readonly findAccountsUseCase: FindAccountsUseCase,
    private readonly findAccountByIdUseCase: FindAccountByIdUseCase,
  ) {}

  @Post()
  public async add(@Body() data: AddAccountDto): Promise<ResponseAccountType> {
    return await this.addAccountUseCase.execute(data);
  }

  @Get()
  public async find(): Promise<ResponseAccountType[]> {
    return await this.findAccountsUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async findById(
    @Param() identifyAccountDto: IdentifyAccountDto,
  ): Promise<ResponseAccountType> {
    return await this.findAccountByIdUseCase.execute(identifyAccountDto);
  }
}
