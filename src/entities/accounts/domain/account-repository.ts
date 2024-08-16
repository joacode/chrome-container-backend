import {
  CreateEntity,
  Nullable,
  UpdateEntity,
} from '../../common/domain/base-entity';
import { Account } from './account';

export interface AccountRepository {
  save(account: CreateEntity<Account>): Promise<Account>;
  findOneById(accountId: string): Promise<Nullable<Account>>;
  findOneByEmail(email: string): Promise<Nullable<Account>>;
  findAll(): Promise<Account[]>;
  deleteById(accountId: string): Promise<void>;
  update(account: UpdateEntity<Account>): Promise<void>;
}
