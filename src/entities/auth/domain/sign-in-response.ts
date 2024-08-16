import { AccountType } from '../../accounts/domain/account';

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
}

export interface SignInPayload {
  sub: string;
  email: string;
  primary_name: string;
  last_name: string;
  type: AccountType;
  isExternal: boolean;
}

export interface LoginPayload {
  email: string;
  password?: string;
}
