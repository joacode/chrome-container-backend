import { AuthToken } from '../../auth/domain/auth-token';
import { BaseEntity } from '../../common/domain/base-entity';
import { ExternalSso } from '../../external-sso/domain/external-sso';

export enum AccountType {
  UNREGISTERED = 'UNREGISTERED',
  ACTIVE = 'ACTIVE',
  SUBSCRIPTION = 'SUBSCRIPTION',
  ADMIN = 'ADMIN',
}

export interface Account extends BaseEntity {
  email: string;
  password?: string;
  primary_name: string;
  last_name: string;
  type: AccountType;
  external?: boolean;
  external_sso?: ExternalSso;
  auth_token?: AuthToken;
}
