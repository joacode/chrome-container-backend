import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { getDatePlusSeven } from '../../../utils/get-date-plus-seven';
import { AccountsFindOneByEmailService } from '../../accounts/application/accounts-find-one-by-email.service';
import { AccountNotExistError } from '../../accounts/domain/exceptions/account-not-exist-error';
import { AuthTokenRepository } from '../domain/auth-token-repository';
import { AccessDenied } from '../domain/exceptions/access-denied';
import { AuthGetTokensService } from './auth-get-tokens.service';
import { AuthTokensUpdateRefreshTokenService } from './auth-tokens-update-refresh-token.service';

@Injectable()
export class AuthTokensRefreshTokenService {
  constructor(
    @Inject('repository') private repository: AuthTokenRepository,
    private authGetTokensService: AuthGetTokensService,
    private accountsFindOneByEmailService: AccountsFindOneByEmailService,
    private authTokensUpdateRefreshTokenService: AuthTokensUpdateRefreshTokenService,
  ) {}

  async run(account_id: string, refreshToken: string) {
    const authToken = await this.repository.findOneByAccountId(account_id);

    if (!authToken?.refresh_token) {
      throw new AccessDenied();
    }

    const refreshTokenMatches = await argon2.verify(
      authToken?.refresh_token,
      refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new AccessDenied();
    }

    const account = await this.accountsFindOneByEmailService.run(account_id);

    if (!account) {
      throw new AccountNotExistError();
    }

    const tokens = await this.authGetTokensService.run({
      sub: account?.id,
      email: account?.email,
      primary_name: account?.primary_name,
      last_name: account?.last_name,
      type: account?.type,
      isExternal: account?.external ?? false,
    });

    await this.authTokensUpdateRefreshTokenService.run({
      account_id,
      refresh_token: tokens.refresh_token,
      expires_at: getDatePlusSeven(),
    });

    return tokens;
  }
}
