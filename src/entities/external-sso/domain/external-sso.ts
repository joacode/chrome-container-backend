import { Account } from '../../accounts/domain/account';
import { BaseEntity } from '../../common/domain/base-entity';

export interface ExternalSso extends BaseEntity {
  provider: string;
  provider_id: string;
  account_id: string;
  account?: Account;
}
