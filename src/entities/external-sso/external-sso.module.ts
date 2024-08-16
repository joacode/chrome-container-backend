import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../accounts/infrastructure/model/account-entity-typeorm.entity';
import { ExternalSsoCreateService } from './application/external-sso-create.service';
import { ExternalSsoDeleteByIdService } from './application/external-sso-delete-by-id.service';
import { ExternalSsoFindAllService } from './application/external-sso-find-all.service';
import { ExternalSsoFindOneByAccountIdService } from './application/external-sso-find-one-by-account-id.service';
import { ExternalSsoFindOneByIdService } from './application/external-sso-find-one-by-id.service';
import { ExternalSsoUpdateService } from './application/external-sso-update.service';
import { ExternalSsoRepositoryInTypeorm } from './infrastructure/external-sso-repository-in-typeorm';
import { ExternalSsoEntity } from './infrastructure/model/external-sso-entity-typeorm.entity';

const applicationService: Provider[] = [
  ExternalSsoFindAllService,
  ExternalSsoFindOneByIdService,
  ExternalSsoDeleteByIdService,
  ExternalSsoCreateService,
  ExternalSsoUpdateService,
  ExternalSsoFindOneByAccountIdService,
];

@Module({
  imports: [TypeOrmModule.forFeature([ExternalSsoEntity, AccountEntity])],
  providers: [
    ...applicationService,
    {
      provide: 'repository',
      useClass: ExternalSsoRepositoryInTypeorm,
    },
  ],
  exports: [...applicationService],
})
export class ExternalSsoModule {}
