import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nullable, UpdateEntity } from '../../common/domain/base-entity';
import { ExternalSsoRepository } from '../domain/external-sso-repository';
import { ExternalSsoEntity } from './model/external-sso-entity-typeorm.entity';

export class ExternalSsoRepositoryInTypeorm implements ExternalSsoRepository {
  constructor(
    @InjectRepository(ExternalSsoEntity)
    private repository: Repository<ExternalSsoEntity>,
  ) {}

  async findOneById(
    externalSsoId: string,
  ): Promise<Nullable<ExternalSsoEntity>> {
    const externalSsoEntity = await this.repository.findOne({
      where: { id: externalSsoId },
      relations: { account: true },
    });

    if (!externalSsoEntity) {
      return undefined;
    }

    return externalSsoEntity;
  }

  async findOneByAccountId(
    account_id: string,
  ): Promise<Nullable<ExternalSsoEntity>> {
    const externalSsoEntity = await this.repository.findOne({
      where: { account_id },
      relations: { account: true },
    });

    if (!externalSsoEntity) {
      return undefined;
    }

    return externalSsoEntity;
  }

  async findAll(): Promise<ExternalSsoEntity[]> {
    return await this.repository.find({
      relations: { account: true },
    });
  }

  public async save(
    externalSso: ExternalSsoEntity,
  ): Promise<ExternalSsoEntity> {
    const model = this.repository.create(externalSso);

    return await this.repository.save(model);
  }

  public async deleteById(externalSsoId: string): Promise<void> {
    await this.repository.softDelete({ id: externalSsoId });
  }

  public async update(
    externalSso: UpdateEntity<ExternalSsoEntity>,
  ): Promise<void> {
    const { id, ...rest } = externalSso;

    await this.repository.update({ id }, rest);
  }
}
