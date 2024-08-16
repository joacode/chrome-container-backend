import { Inject, Injectable } from '@nestjs/common';
import { Nullable } from '../../common/domain/base-entity';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account-repository';

@Injectable()
export class AccountsFindOneByEmailService {
  constructor(@Inject('repository') private repository: AccountRepository) {}

  public async run(email: string): Promise<Nullable<Account>> {
    return await this.repository.findOneByEmail(email);
  }
}
