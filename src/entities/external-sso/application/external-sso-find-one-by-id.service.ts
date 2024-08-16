import { Inject, Injectable } from '@nestjs/common';
import { ExternalSsoNotExistError } from '../domain/exceptions/external-sso-not-exist-error';
import { ExternalSso } from '../domain/external-sso';
import { ExternalSsoRepository } from '../domain/external-sso-repository';

@Injectable()
export class ExternalSsoFindOneByIdService {
  constructor(
    @Inject('repository') private repository: ExternalSsoRepository,
  ) {}

  public async run(externalSsoId: string): Promise<ExternalSso> {
    const externalSso = await this.repository.findOneById(externalSsoId);

    if (!externalSso) {
      throw new ExternalSsoNotExistError();
    }

    return externalSso;
  }
}
