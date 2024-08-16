import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountsCreateService } from '../../../entities/accounts/application/accounts-create.service';
import {
  ACCOUNTS_ERROR_MAPPER,
  AccountsApiResponse,
  CreateAccountDto,
} from '../accounts.dto';

@ApiTags('accounts')
@Controller('/accounts')
export class AccountsCreateController {
  constructor(private readonly accountsCreateService: AccountsCreateService) {}

  @Post()
  @ApiOkResponse({
    description: 'create an account',
    type: AccountsApiResponse,
  })
  @ApiNotFoundResponse({
    description: ACCOUNTS_ERROR_MAPPER.NOT_FOUND,
    schema: {
      type: 'object',
      example: {
        data: undefined,
        error: ACCOUNTS_ERROR_MAPPER.NOT_FOUND,
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: ACCOUNTS_ERROR_MAPPER.INTERNAL_SERVER_ERROR,
    schema: {
      type: 'object',
      example: {
        data: undefined,
        error: ACCOUNTS_ERROR_MAPPER.INTERNAL_SERVER_ERROR,
      },
    },
  })
  public async createAccount(@Body() body: CreateAccountDto): Promise<void> {
    try {
      await this.accountsCreateService.run(body);
    } catch {
      throw new HttpException(
        ACCOUNTS_ERROR_MAPPER.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
