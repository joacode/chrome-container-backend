import { Injectable } from '@nestjs/common';
import { AccountsCreateService } from '../../accounts/application/accounts-create.service';
import { AccountType } from '../../accounts/domain/account';
import { ExternalSsoCreateService } from '../../external-sso/application/external-sso-create.service';
import { GoogleLoginRequest } from '../domain/google-login-response';
import { SignInResponse } from '../domain/sign-in-response';
import { AuthLoginService } from './auth-login.service';

@Injectable()
export class AuthGoogleService {
  constructor(
    private accountsCreateService: AccountsCreateService,
    private externalSsoCreateService: ExternalSsoCreateService,
    private authService: AuthLoginService,
  ) {}

  async run(googleAuth: GoogleLoginRequest): Promise<SignInResponse> {
    if (googleAuth.isNewUser) {
      const account = await this.accountsCreateService.run({
        email: googleAuth.profile.email,
        primary_name: googleAuth.profile.given_name,
        last_name: googleAuth.profile.family_name,
        type: AccountType.ACTIVE,
        external: true,
      });

      await this.externalSsoCreateService.run({
        account_id: account.id,
        provider: 'google',
        provider_id: googleAuth.providerId,
      });
    }

    return await this.authService.signIn(
      {
        email: googleAuth.profile.email,
        password: undefined,
      },
      true,
    );
  }
}
