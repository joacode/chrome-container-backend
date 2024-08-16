import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService, TypeOrmConfiguration } from './clients/typeorm';
import { AccountsApiModule } from './controllers/accounts/accounts.api.module';
import { AuthApiModule } from './controllers/auth/auth.api.module';
import { AccessTokenGuard } from './controllers/common/guards/access-token.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [TypeOrmConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AccountsApiModule,
    AuthApiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
