import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateEntity } from '../../common/domain/base-entity';
import { AuthToken } from '../domain/auth-token';
import { AuthTokenRepository } from '../domain/auth-token-repository';

@Injectable()
export class AuthTokensUpdateRefreshTokenService {
  constructor(@Inject('repository') private repository: AuthTokenRepository) {}

  async run(authToken: CreateEntity<AuthToken>): Promise<void> {
    const existingAuthToken = await this.repository.findOneByAccountId(
      authToken.account_id,
    );

    if (!authToken?.refresh_token) {
      await this.repository.update({
        ...existingAuthToken,
        ...authToken,
      } as AuthToken);

      return;
    }

    const hashedRefreshToken = await this.hashData(
      authToken?.refresh_token as string,
    );

    await this.repository.update({
      ...existingAuthToken,
      ...authToken,
      refresh_token: hashedRefreshToken,
    } as AuthToken);
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
