import { Controller, Get, Req } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthLogoutService } from '../../../entities/auth/application/auth-logout.service';
import { AUTH_ERROR_MAPPER } from '../auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthLogoutController {
  constructor(private authLogoutService: AuthLogoutService) {}

  @Get('logout')
  @ApiOkResponse({
    description: 'logout',
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
  async logout(@Req() req: Request): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    console.log({ user: req.user['sub'] });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.authLogoutService.run(req.user['sub']);
  }
}
