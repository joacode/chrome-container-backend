import { Inject, Injectable } from '@nestjs/common';
import { ExternalSsoNotExistError } from '../domain/exceptions/external-sso-not-exist-error';
import { ExternalSso } from '../domain/external-sso';
import { ExternalSsoRepository } from '../domain/external-sso-repository';

@Injectable()
export class ExternalSsoFindOneByAccountIdService {
  constructor(
    @Inject('repository') private repository: ExternalSsoRepository,
  ) {}

  public async run(accountId: string): Promise<ExternalSso> {
    const account = await this.repository.findOneByAccountId(accountId);

    if (!account) {
      throw new ExternalSsoNotExistError();
    }

    return account;
  }
}
