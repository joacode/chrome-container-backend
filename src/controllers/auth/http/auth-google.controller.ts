import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGoogleService } from '../../../entities/auth/application/auth-google.service';
import { Public } from '../../common/decorators/public.decorator';
import {
  AUTH_ERROR_MAPPER,
  GoogleAuthDto,
  LoginResponseDto,
} from '../auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthGoogleController {
  constructor(private authGoogleService: AuthGoogleService) {}

  @Public()
  @Post('login/google')
  @ApiOkResponse({
    description: 'google sso',
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
  async googleSignIn(
    @Body() userData: GoogleAuthDto,
  ): Promise<LoginResponseDto> {
    return await this.authGoogleService.run(userData);
  }
}
