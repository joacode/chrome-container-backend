/* eslint-disable unicorn/no-null */
import { Injectable } from '@nestjs/common';
import { AuthTokensUpdateRefreshTokenService } from './auth-tokens-update-refresh-token.service';

@Injectable()
export class AuthLogoutService {
  constructor(
    private authTokensUpdateRefreshTokenService: AuthTokensUpdateRefreshTokenService,
  ) {}

  async run(account_id: string) {
    await this.authTokensUpdateRefreshTokenService.run({
      account_id: account_id,
      refresh_token: undefined,
      expires_at: undefined,
    });
  }
}
