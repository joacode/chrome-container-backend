import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { getDatePlusSeven } from '../../../utils/get-date-plus-seven';
import { AccountsCreateService } from '../../accounts/application/accounts-create.service';
import { AccountsFindOneByEmailService } from '../../accounts/application/accounts-find-one-by-email.service';
import { Account } from '../../accounts/domain/account';
import { AccountAlreadyExistError } from '../../accounts/domain/exceptions/account-already-exist-error';
import { CreateEntity } from '../../common/domain/base-entity';
import { SignInResponse } from '../domain/sign-in-response';
import { AuthGetTokensService } from './auth-get-tokens.service';
import { AuthTokensCreateRefreshTokenService } from './auth-tokens-create-refresh-token.service';

@Injectable()
export class AuthSignUpService {
  constructor(
    private accountsFindOneByEmailService: AccountsFindOneByEmailService,
    private accountsCreateService: AccountsCreateService,
    private authGetTokensService: AuthGetTokensService,
    private authTokensCreateRefreshTokenService: AuthTokensCreateRefreshTokenService,
  ) {}

  async run(account: CreateEntity<Account>): Promise<SignInResponse> {
    const accountExists = await this.accountsFindOneByEmailService.run(
      account.email,
    );

    if (accountExists) {
      throw new AccountAlreadyExistError();
    }

    // Hash password
    const hash = await this.hashData(account.password as string);

    const newAccount = await this.accountsCreateService.run({
      ...account,
      password: hash,
    });

    const payload = {
      sub: newAccount.id,
      email: newAccount.email,
      primary_name: newAccount.primary_name,
      last_name: newAccount.last_name,
      type: newAccount.type,
      isExternal: false,
    };

    const tokens = await this.authGetTokensService.run(payload);

    await this.authTokensCreateRefreshTokenService.run({
      account_id: newAccount.id,
      refresh_token: tokens.refresh_token,
      expires_at: getDatePlusSeven(),
    });

    return tokens;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
