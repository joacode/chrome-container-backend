import {
  CreateEntity,
  Nullable,
  UpdateEntity,
} from '../../common/domain/base-entity';
import { AuthToken } from './auth-token';

export interface AuthTokenRepository {
  save(authToken: CreateEntity<AuthToken>): Promise<AuthToken>;
  findOneByAccountId(authTokenId: string): Promise<Nullable<AuthToken>>;
  findAll(): Promise<AuthToken[]>;
  update(authToken: UpdateEntity<AuthToken>): Promise<void>;
}
