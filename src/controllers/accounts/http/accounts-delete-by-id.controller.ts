import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AccountsDeleteByIdService } from '../../../entities/accounts/application/accounts-delete-by-id.service';
import { ACCOUNTS_ERROR_MAPPER, AccountsApiResponse } from '../accounts.dto';

@ApiTags('accounts')
@Controller('/accounts')
export class AccountsDeleteByIdController {
  constructor(
    private readonly accountsDeleteByIdService: AccountsDeleteByIdService,
  ) {}

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'account id',
  })
  @ApiOkResponse({
    description: 'delete an account',
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
  public async deleteAccountById(@Param('id') id: string): Promise<void> {
    try {
      await this.accountsDeleteByIdService.run(id);
    } catch {
      throw new HttpException(
        ACCOUNTS_ERROR_MAPPER.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
