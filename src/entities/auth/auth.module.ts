import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenGuard } from '../../controllers/common/guards/access-token.guard';
import { AccountsModule } from '../accounts/accounts.module';
import { AccountEntity } from '../accounts/infrastructure/model/account-entity-typeorm.entity';
import { ExternalSsoModule } from '../external-sso/external-sso.module';
import { AccessTokenStrategy } from './application/access-token.strategy';
import { AuthGetTokensService } from './application/auth-get-tokens.service';
import { AuthGoogleService } from './application/auth-google.service';
import { AuthLoginService } from './application/auth-login.service';
import { AuthLogoutService } from './application/auth-logout.service';
import { AuthSignUpService } from './application/auth-sign-up.service';
import { AuthTokensCreateRefreshTokenService } from './application/auth-tokens-create-refresh-token.service';
import { AuthTokensRefreshTokenService } from './application/auth-tokens-refresh-token.service';
import { AuthTokensUpdateRefreshTokenService } from './application/auth-tokens-update-refresh-token.service';
import { RefreshTokenStrategy } from './application/refresh-token.strategy';
import { AuthTokenRepositoryInTypeorm } from './infrastructure/auth-token-repository-in-typeorm';
import { AuthTokenEntity } from './infrastructure/model/auth-token-entity-typeorm.entity';

const applicationService: Provider[] = [
  AccessTokenStrategy,
  AuthGetTokensService,
  AuthGoogleService,
  AuthLoginService,
  AuthLogoutService,
  AuthSignUpService,
  AuthTokensCreateRefreshTokenService,
  AuthTokensRefreshTokenService,
  AuthTokensUpdateRefreshTokenService,
  RefreshTokenStrategy,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, AuthTokenEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    AccountsModule,
    ExternalSsoModule,
  ],
  providers: [
    ...applicationService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: 'repository',
      useClass: AuthTokenRepositoryInTypeorm,
    },
  ],
  exports: [...applicationService],
})
export class AuthModule {}
