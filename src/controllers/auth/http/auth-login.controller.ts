import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthLoginService } from '../../../entities/auth/application/auth-login.service';
import { Public } from '../../common/decorators/public.decorator';
import { AUTH_ERROR_MAPPER, AuthDto, LoginResponseDto } from '../auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthLoginController {
  constructor(private authLoginService: AuthLoginService) {}

  @Public()
  @Post('login')
  @ApiOkResponse({
    description: 'sign in',
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
  async login(@Body() loginDto: AuthDto): Promise<LoginResponseDto> {
    return this.authLoginService.signIn(loginDto, false);
  }
}
