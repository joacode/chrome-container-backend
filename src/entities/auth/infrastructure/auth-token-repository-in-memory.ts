import { Nullable } from '../../common/domain/base-entity';
import { RepositoryInMemory } from '../../common/infrastructure/repository-in-memory';
import { AuthToken } from '../domain/auth-token';
import { AuthTokenRepository } from '../domain/auth-token-repository';

export class AuthTokenRepositoryInMemory
  extends RepositoryInMemory<AuthToken>
  implements AuthTokenRepository
{
  constructor() {
    super();
  }

  findOneByAccountId(account_id: string): Promise<Nullable<AuthToken>> {
    const filter = this.memory.find(entity => entity.account_id === account_id);
    return Promise.resolve(filter);
  }
}
