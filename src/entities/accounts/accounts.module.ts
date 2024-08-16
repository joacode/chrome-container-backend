import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokenEntity } from '../auth/infrastructure/model/auth-token-entity-typeorm.entity';
import { ExternalSsoEntity } from '../external-sso/infrastructure/model/external-sso-entity-typeorm.entity';
import { AccountsCreateService } from './application/accounts-create.service';
import { AccountsDeleteByIdService } from './application/accounts-delete-by-id.service';
import { AccountsFindAllService } from './application/accounts-find-all.service';
import { AccountsFindOneByEmailService } from './application/accounts-find-one-by-email.service';
import { AccountsFindOneByIdService } from './application/accounts-find-one-by-id.service';
import { AccountsUpdateService } from './application/accounts-update.service';
import { AccountRepositoryInTypeorm } from './infrastructure/account-repository-in-typeorm';
import { AccountEntity } from './infrastructure/model/account-entity-typeorm.entity';

const applicationService: Provider[] = [
  AccountsFindAllService,
  AccountsFindOneByIdService,
  AccountsDeleteByIdService,
  AccountsCreateService,
  AccountsUpdateService,
  AccountsFindOneByEmailService,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      AuthTokenEntity,
      ExternalSsoEntity,
    ]),
  ],
  providers: [
    ...applicationService,
    {
      provide: 'repository',
      useClass: AccountRepositoryInTypeorm,
    },
  ],
  exports: [...applicationService],
})
export class AccountsModule {}
