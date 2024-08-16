import { Inject, Injectable } from '@nestjs/common';
import { CreateEntity } from '../../common/domain/base-entity';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account-repository';

@Injectable()
export class AccountsCreateService {
  constructor(@Inject('repository') private repository: AccountRepository) {}

  public async run(account: CreateEntity<Account>): Promise<Account> {
    return await this.repository.save(account);
  }
}
