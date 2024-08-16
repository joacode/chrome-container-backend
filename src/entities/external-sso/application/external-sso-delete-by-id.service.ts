import { Inject, Injectable } from '@nestjs/common';
import { ExternalSsoRepository } from '../domain/external-sso-repository';
import { ExternalSsoFindOneByIdService } from './external-sso-find-one-by-id.service';

@Injectable()
export class ExternalSsoDeleteByIdService {
  constructor(
    @Inject('repository') private repository: ExternalSsoRepository,
    private externalSsoFindOneByIdService: ExternalSsoFindOneByIdService,
  ) {}

  public async run(externalSsoId: string): Promise<void> {
    const externalSso =
      await this.externalSsoFindOneByIdService.run(externalSsoId);

    return await this.repository.deleteById(externalSso.id);
  }
}
