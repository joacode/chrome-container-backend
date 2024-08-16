import { Inject, Injectable } from '@nestjs/common';
import { CreateEntity } from '../../common/domain/base-entity';
import { ExternalSso } from '../domain/external-sso';
import { ExternalSsoRepository } from '../domain/external-sso-repository';

@Injectable()
export class ExternalSsoCreateService {
  constructor(
    @Inject('repository') private repository: ExternalSsoRepository,
  ) {}

  public async run(account: CreateEntity<ExternalSso>): Promise<ExternalSso> {
    return await this.repository.save(account);
  }
}
