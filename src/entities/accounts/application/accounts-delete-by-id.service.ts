import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from '../domain/account-repository';
import { AccountsFindOneByIdService } from './accounts-find-one-by-id.service';

@Injectable()
export class AccountsDeleteByIdService {
  constructor(
    @Inject('repository') private repository: AccountRepository,
    private accountsFindOneByIdService: AccountsFindOneByIdService,
  ) {}

  public async run(accountId: string): Promise<void> {
    const account = await this.accountsFindOneByIdService.run(accountId);

    return await this.repository.deleteById(account.id);
  }
}
