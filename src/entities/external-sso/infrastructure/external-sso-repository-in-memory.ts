import { Nullable } from '../../common/domain/base-entity';
import { RepositoryInMemory } from '../../common/infrastructure/repository-in-memory';
import { ExternalSso } from '../domain/external-sso';
import { ExternalSsoRepository } from '../domain/external-sso-repository';

export class ExternalSsoRepositoryInMemory
  extends RepositoryInMemory<ExternalSso>
  implements ExternalSsoRepository
{
  constructor() {
    super();
  }

  findOneByAccountId(account_id: string): Promise<Nullable<ExternalSso>> {
    const filter = this.memory.find(entity => entity.account_id === account_id);
    return Promise.resolve(filter);
  }
}
