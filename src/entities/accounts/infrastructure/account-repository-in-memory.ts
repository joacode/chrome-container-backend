import { Nullable } from '../../common/domain/base-entity';
import { RepositoryInMemory } from '../../common/infrastructure/repository-in-memory';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account-repository';

export class AccountRepositoryInMemory
  extends RepositoryInMemory<Account>
  implements AccountRepository
{
  constructor() {
    super();
  }

  findOneByEmail(email: string): Promise<Nullable<Account>> {
    const filter = this.memory.find(entity => entity.email === email);
    return Promise.resolve(filter);
  }
}
