import { Column, Entity, OneToOne } from 'typeorm';
import { AuthTokenEntity } from '../../../auth/infrastructure/model/auth-token-entity-typeorm.entity';
import { BaseEntityTypeOrm } from '../../../common/infrastructure/model/base-entity-typeorm';
import { ExternalSsoEntity } from '../../../external-sso/infrastructure/model/external-sso-entity-typeorm.entity';
import { AccountType } from '../../domain/account';

@Entity({
  name: 'accounts',
})
export class AccountEntity extends BaseEntityTypeOrm {
  @Column('varchar')
  email!: string;

  @Column('varchar')
  password?: string;

  @Column('varchar')
  primary_name!: string;

  @Column('varchar')
  last_name!: string;

  @Column('varchar')
  type!: AccountType;

  @Column('boolean')
  external?: boolean;

  @OneToOne(() => ExternalSsoEntity, externalSso => externalSso.account)
  external_sso: ExternalSsoEntity;

  @OneToOne(() => AuthTokenEntity, authToken => authToken.account)
  auth_token: AuthTokenEntity;
}
