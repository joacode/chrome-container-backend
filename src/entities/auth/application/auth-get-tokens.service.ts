import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignInPayload, SignInResponse } from '../domain/sign-in-response';

@Injectable()
export class AuthGetTokensService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async run(payload: SignInPayload): Promise<SignInResponse> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    console.log({ access_token });

    return {
      access_token,
      refresh_token,
    };
  }
}
