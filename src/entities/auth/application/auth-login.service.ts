import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { getDatePlusSeven } from '../../../utils/get-date-plus-seven';
import { AccountsFindOneByEmailService } from '../../accounts/application/accounts-find-one-by-email.service';
import { LoginPayload } from '../domain/sign-in-response';
import { AuthGetTokensService } from './auth-get-tokens.service';
import { AuthTokensUpdateRefreshTokenService } from './auth-tokens-update-refresh-token.service';

@Injectable()
export class AuthLoginService {
  constructor(
    private accountsFindOneByEmail: AccountsFindOneByEmailService,
    private authGetTokensService: AuthGetTokensService,
    private authTokensUpdateRefreshTokenService: AuthTokensUpdateRefreshTokenService,
  ) {}

  async signIn(data: LoginPayload, isExternal: boolean) {
    const account = await this.accountsFindOneByEmail.run(data.email);

    if (!account) {
      throw new UnauthorizedException();
    }

    if (!isExternal) {
      const passwordMatches = await argon2.verify(
        account.password as string,
        data?.password as string,
      );

      if (!passwordMatches) {
        throw new UnauthorizedException();
      }
    }

    const payload = {
      sub: account.id,
      email: account.email,
      primary_name: account.primary_name,
      last_name: account.last_name,
      type: account.type,
      isExternal: false,
    };

    const tokens = await this.authGetTokensService.run(payload);

    await this.authTokensUpdateRefreshTokenService.run({
      account_id: account.id,
      refresh_token: tokens.refresh_token,
      expires_at: getDatePlusSeven(),
    });

    return tokens;
  }
}
