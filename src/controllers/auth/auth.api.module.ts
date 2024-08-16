import { Module } from '@nestjs/common';
import { AuthModule } from '../../entities/auth/auth.module';
import { AuthGoogleController } from './http/auth-google.controller';
import { AuthLoginController } from './http/auth-login.controller';
import { AuthLogoutController } from './http/auth-logout.controller';
import { AuthRefreshTokensController } from './http/auth-refresh-tokens.controller';
import { AuthSignUpController } from './http/auth-sign-up.controller';

@Module({
  imports: [AuthModule],
  controllers: [
    AuthGoogleController,
    AuthLoginController,
    AuthLogoutController,
    AuthRefreshTokensController,
    AuthSignUpController,
  ],
  providers: [],
})
export class AuthApiModule {}
