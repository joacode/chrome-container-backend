import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AccountEntity } from '../../../accounts/infrastructure/model/account-entity-typeorm.entity';
import { BaseEntityTypeOrm } from '../../../common/infrastructure/model/base-entity-typeorm';

@Entity({
  name: 'external_sso',
})
export class ExternalSsoEntity extends BaseEntityTypeOrm {
  @Column('varchar')
  provider!: string;

  @Column('varchar')
  provider_id!: string;

  @Column('varchar')
  account_id!: string;

  @OneToOne(() => AccountEntity, account => account.external_sso)
  @JoinColumn({ name: 'account_id' })
  account!: AccountEntity;
}
