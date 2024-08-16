import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nullable } from '../../common/domain/base-entity';
import { AuthToken } from '../domain/auth-token';
import { AuthTokenRepository } from '../domain/auth-token-repository';
import { AuthTokenEntity } from './model/auth-token-entity-typeorm.entity';

export class AuthTokenRepositoryInTypeorm implements AuthTokenRepository {
  constructor(
    @InjectRepository(AuthTokenEntity)
    private repository: Repository<AuthTokenEntity>,
  ) {}

  async findOneById(authTokenId: string): Promise<Nullable<AuthToken>> {
    const authTokenEntity = await this.repository.findOne({
      where: { id: authTokenId },
    });

    if (!authTokenEntity) {
      return undefined;
    }

    return authTokenEntity;
  }

  async findOneByAccountId(account_id: string): Promise<Nullable<AuthToken>> {
    const authTokenEntity = await this.repository.findOne({
      where: { account_id },
    });

    if (!authTokenEntity) {
      return undefined;
    }

    return authTokenEntity;
  }

  async findAll(): Promise<AuthToken[]> {
    return await this.repository.find();
  }

  public async save(authToken: AuthToken): Promise<AuthToken> {
    const model = this.repository.create(authToken);

    return await this.repository.save(model);
  }

  public async update(authToken: AuthToken): Promise<void> {
    const { id, ...rest } = authToken;

    if (!rest.refresh_token) {
      await this.repository.update(
        { id },
        {
          ...rest,
          // eslint-disable-next-line unicorn/no-null
          refresh_token: null as unknown as string,
          // eslint-disable-next-line unicorn/no-null
          expires_at: null as unknown as string,
        },
      );
      return;
    }

    await this.repository.update({ id }, rest);
  }
}
