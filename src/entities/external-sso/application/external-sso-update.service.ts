import { Inject, Injectable } from '@nestjs/common';
import { UpdateEntity } from '../../common/domain/base-entity';
import { ExternalSso } from '../domain/external-sso';
import { ExternalSsoRepository } from '../domain/external-sso-repository';
import { ExternalSsoFindOneByIdService } from './external-sso-find-one-by-id.service';

@Injectable()
export class ExternalSsoUpdateService {
  constructor(
    @Inject('repository') private repository: ExternalSsoRepository,
    private externalSsosFindOneByIdService: ExternalSsoFindOneByIdService,
  ) {}

  public async run(
    externalSso: UpdateEntity<Partial<ExternalSso>>,
  ): Promise<void> {
    const existingAccount = await this.externalSsosFindOneByIdService.run(
      externalSso.id as string,
    );

    return await this.repository.update({ ...existingAccount, ...externalSso });
  }
}
