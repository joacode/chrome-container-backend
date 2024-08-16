import { Inject, Injectable } from '@nestjs/common';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account-repository';
import { AccountNotExistError } from '../domain/exceptions/account-not-exist-error';

@Injectable()
export class AccountsFindOneByIdService {
  constructor(@Inject('repository') private repository: AccountRepository) {}

  public async run(accountId: string): Promise<Account> {
    const account = await this.repository.findOneById(accountId);

    if (!account) {
      throw new AccountNotExistError();
    }

    return account;
  }
}
