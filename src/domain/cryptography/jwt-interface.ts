import { AccountModel } from '@app/infra/database/mongodb/models/account/account.model';
import { VerifyTokenDto } from '@app/presentation/dtos/auth/verify-token.dto';

export interface JwtInterface {
  encrypt(account: AccountModel): Promise<string>;
  decrypt: (token: string) => Promise<VerifyTokenDto>;
}
