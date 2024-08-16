import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AccountEntity } from '../../../accounts/infrastructure/model/account-entity-typeorm.entity';
import { BaseEntityTypeOrm } from '../../../common/infrastructure/model/base-entity-typeorm';

@Entity({
  name: 'auth_tokens',
})
export class AuthTokenEntity extends BaseEntityTypeOrm {
  @Column('uuid')
  account_id: string;

  @Column({ type: 'varchar', nullable: true })
  refresh_token?: string;

  @Column({ type: 'timestamp', nullable: true })
  expires_at?: Date;

  @OneToOne(() => AccountEntity, account => account.auth_token)
  @JoinColumn({ name: 'account_id' })
  account?: AccountEntity;
}
