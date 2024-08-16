import { BaseEntity } from '../../common/domain/base-entity';

export interface AuthToken extends BaseEntity {
  account_id: string;
  refresh_token?: string;
  expires_at?: Date;
}
