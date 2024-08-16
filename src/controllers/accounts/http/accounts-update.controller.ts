import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountsUpdateService } from '../../../entities/accounts/application/accounts-update.service';
import {
  ACCOUNTS_ERROR_MAPPER,
  AccountsApiResponse,
  UpdateAccountDto,
} from '../accounts.dto';

@ApiTags('accounts')
@Controller('/accounts')
export class AccountsUpdateController {
  constructor(private readonly accountsUpdateService: AccountsUpdateService) {}

  @Put()
  @ApiOkResponse({
    description: 'update a account',
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
  public async updateAccount(@Body() body: UpdateAccountDto): Promise<void> {
    try {
      await this.accountsUpdateService.run(body);
    } catch {
      throw new HttpException(
        ACCOUNTS_ERROR_MAPPER.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
