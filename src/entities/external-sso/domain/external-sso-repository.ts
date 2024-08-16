import {
  CreateEntity,
  Nullable,
  UpdateEntity,
} from '../../common/domain/base-entity';
import { ExternalSso } from './external-sso';

export interface ExternalSsoRepository {
  save(externalSso: CreateEntity<ExternalSso>): Promise<ExternalSso>;
  findOneById(externalSsoId: string): Promise<Nullable<ExternalSso>>;
  findOneByAccountId(externalSsoId: string): Promise<Nullable<ExternalSso>>;
  findAll(): Promise<ExternalSso[]>;
  deleteById(externalSsoId: string): Promise<void>;
  update(externalSso: UpdateEntity<ExternalSso>): Promise<void>;
}
