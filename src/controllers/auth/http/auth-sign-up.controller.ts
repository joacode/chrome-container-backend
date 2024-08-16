import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthSignUpService } from '../../../entities/auth/application/auth-sign-up.service';
import { CreateAccountDto } from '../../accounts/accounts.dto';
import { Public } from '../../common/decorators/public.decorator';
import { AUTH_ERROR_MAPPER, LoginResponseDto } from '../auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthSignUpController {
  constructor(private authSignUpService: AuthSignUpService) {}

  @Public()
  @Post('sign-up')
  @ApiOkResponse({
    description: 'sign up',
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
  async signUp(@Body() signUpDto: CreateAccountDto): Promise<LoginResponseDto> {
    return this.authSignUpService.run(signUpDto);
  }
}
