import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateEntity } from '../../common/domain/base-entity';
import { AuthToken } from '../domain/auth-token';
import { AuthTokenRepository } from '../domain/auth-token-repository';

@Injectable()
export class AuthTokensCreateRefreshTokenService {
  constructor(@Inject('repository') private repository: AuthTokenRepository) {}

  async run(authToken: CreateEntity<AuthToken>): Promise<void> {
    const hashedRefreshToken = await this.hashData(
      authToken.refresh_token as string,
    );

    await this.repository.save({
      ...authToken,
      refresh_token: hashedRefreshToken,
    });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
