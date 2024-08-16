import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nullable, UpdateEntity } from '../../common/domain/base-entity';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account-repository';
import { AccountEntity } from './model/account-entity-typeorm.entity';

export class AccountRepositoryInTypeorm implements AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private repository: Repository<AccountEntity>,
  ) {}

  async findOneById(accountId: string): Promise<Nullable<Account>> {
    const accountEntity = await this.repository.findOne({
      where: { id: accountId },
      relations: { external_sso: true },
    });

    if (!accountEntity) {
      return undefined;
    }

    return accountEntity;
  }

  async findOneByEmail(email: string): Promise<Nullable<Account>> {
    const accountEntity = await this.repository.findOne({
      where: { email },
      relations: { external_sso: true },
    });

    if (!accountEntity) {
      return undefined;
    }

    return accountEntity;
  }

  async findAll(): Promise<Account[]> {
    return await this.repository.find({
      relations: { external_sso: true },
    });
  }

  public async save(account: Account): Promise<Account> {
    const model = this.repository.create(account);

    return await this.repository.save(model);
  }

  public async deleteById(accountId: string): Promise<void> {
    await this.repository.softDelete({ id: accountId });
  }

  public async update(account: UpdateEntity<Account>): Promise<void> {
    const { id, ...rest } = account;

    await this.repository.update({ id }, rest);
  }
}
