import { Inject, Injectable } from '@nestjs/common';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account-repository';

@Injectable()
export class AccountsFindAllService {
  constructor(@Inject('repository') private repository: AccountRepository) {}

  public async run(): Promise<Account[]> {
    return await this.repository.findAll();
  }
}
