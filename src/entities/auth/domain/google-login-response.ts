export interface Profile {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  name: string;
  picture: string;
  sub: string;
}

export interface GoogleLoginRequest {
  isNewUser: boolean;
  profile: Profile;
  providerId: string;
}