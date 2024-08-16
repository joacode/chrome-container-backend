import {
  Controller,
  Get,
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
import { AccountsFindOneByIdService } from '../../../entities/accounts/application/accounts-find-one-by-id.service';
import { ACCOUNTS_ERROR_MAPPER, AccountsApiResponse } from '../accounts.dto';

@ApiTags('accounts')
@Controller('/accounts')
export class AccountsFindOneByIdController {
  constructor(
    private readonly accountsFindOneByIdService: AccountsFindOneByIdService,
  ) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'account id',
  })
  @ApiOkResponse({
    description: 'get an account',
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
  public async findAccountById(
    @Param('id') id: string,
  ): Promise<AccountsApiResponse> {
    try {
      const accounts = await this.accountsFindOneByIdService.run(id);

      return { data: accounts };
    } catch {
      throw new HttpException(
        ACCOUNTS_ERROR_MAPPER.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
