import { Controller, Post, Req } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthTokensRefreshTokenService } from '../../../entities/auth/application/auth-tokens-refresh-token.service';
import { SignInResponse } from '../../../entities/auth/domain/sign-in-response';
import { Public } from '../../common/decorators/public.decorator';
import { AUTH_ERROR_MAPPER, LoginResponseDto } from '../auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthRefreshTokensController {
  constructor(
    private authTokensRefreshTokenService: AuthTokensRefreshTokenService,
  ) {}

  @Public()
  @Post('refresh')
  @ApiOkResponse({
    description: 'refresh token',
    type: LoginResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: AUTH_ERROR_MAPPER.INTERNAL_SERVER_ERROR,
    schema: {
      type: 'object',
      example: {
        data: undefined,
        error: AUTH_ERROR_MAPPER.INTERNAL_SERVER_ERROR,
      },
    },
  })
  async refreshTokens(@Req() req: Request): Promise<SignInResponse> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const accountId = req.user['sub'];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const refreshToken = req.user['refreshToken'];

    return this.authTokensRefreshTokenService.run(accountId, refreshToken);
  }
}
