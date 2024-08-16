import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsBoolean, IsNumber, IsString } from 'class-validator';
import {
  GoogleLoginRequest,
  Profile,
} from '../../entities/auth/domain/google-login-response';

export enum AUTH_ERROR_MAPPER {
  INTERNAL_SERVER_ERROR = 'auth.internal-server-error',
}

export class AuthDto {
  @IsString()
  @ApiProperty({ type: String })
  email!: string;

  @IsString()
  @ApiProperty({ type: String })
  password!: string;
}

export class LoginResponseDto {
  @IsString()
  @ApiProperty({ type: String })
  access_token: string;

  @IsString()
  @ApiProperty({ type: String })
  refresh_token!: string;
}

export class ProfileDto implements Profile {
  @IsString()
  @ApiProperty({ type: String })
  aud: string;

  @IsString()
  @ApiProperty({ type: String })
  azp: string;

  @IsString()
  @ApiProperty({ type: String })
  email: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  email_verified: boolean;

  @IsNumber()
  @ApiProperty({ type: Number })
  exp: number;

  @IsString()
  @ApiProperty({ type: String })
  family_name: string;

  @IsString()
  @ApiProperty({ type: String })
  given_name: string;
  iat: number;

  @IsString()
  @ApiProperty({ type: String })
  iss: string;

  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsString()
  @ApiProperty({ type: String })
  picture: string;

  @IsString()
  @ApiProperty({ type: String })
  sub: string;
}

export class GoogleAuthDto implements GoogleLoginRequest {
  @IsBoolean()
  @ApiProperty({ type: Boolean })
  isNewUser: boolean;

  @Allow()
  @ApiProperty({ type: ProfileDto })
  profile: Profile;

  @IsString()
  @ApiProperty({ type: String })
  providerId: string;
}
