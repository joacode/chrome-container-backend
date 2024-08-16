import { Module } from '@nestjs/common';
import { AccountsModule } from '../../entities/accounts/accounts.module';
import { AccountsCreateController } from './http/accounts-create.controller';
import { AccountsDeleteByIdController } from './http/accounts-delete-by-id.controller';
import { AccountsFindAllController } from './http/accounts-find-all.controller';
import { AccountsFindOneByIdController } from './http/accounts-find-one-by-id.controller';
import { AccountsUpdateController } from './http/accounts-update.controller';

@Module({
  imports: [AccountsModule],
  controllers: [
    AccountsFindAllController,
    AccountsFindOneByIdController,
    AccountsDeleteByIdController,
    AccountsUpdateController,
    AccountsCreateController,
  ],
  providers: [],
})
export class AccountsApiModule {}
