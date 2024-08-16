import { Inject, Injectable } from '@nestjs/common';
import { ExternalSso } from '../domain/external-sso';
import { ExternalSsoRepository } from '../domain/external-sso-repository';

@Injectable()
export class ExternalSsoFindAllService {
  constructor(
    @Inject('repository') private repository: ExternalSsoRepository,
  ) {}

  public async run(): Promise<ExternalSso[]> {
    return await this.repository.findAll();
  }
}
