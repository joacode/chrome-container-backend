import { Inject, Injectable } from '@nestjs/common';
import { UpdateEntity } from '../../common/domain/base-entity';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account-repository';
import { AccountsFindOneByIdService } from './accounts-find-one-by-id.service';

@Injectable()
export class AccountsUpdateService {
  constructor(
    @Inject('repository') private repository: AccountRepository,
    private accountsFindOneByIdService: AccountsFindOneByIdService,
  ) {}

  public async run(account: UpdateEntity<Partial<Account>>): Promise<void> {
    const existingAccount = await this.accountsFindOneByIdService.run(
      account.id as string,
    );

    return await this.repository.update({ ...existingAccount, ...account });
  }
}
