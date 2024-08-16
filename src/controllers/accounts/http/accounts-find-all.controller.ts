import { Controller, Get } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountsFindAllService } from '../../../entities/accounts/application/accounts-find-all.service';
import {
  ACCOUNTS_ERROR_MAPPER,
  AccountsListApiResponse,
} from '../accounts.dto';

@ApiTags('accounts')
@Controller('/accounts')
export class AccountsFindAllController {
  constructor(
    private readonly accountsFindAllService: AccountsFindAllService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'get a list of accounts',
    type: AccountsListApiResponse,
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
  public async findAccounts(): Promise<AccountsListApiResponse> {
    const accounts = await this.accountsFindAllService.run();

    return { data: accounts };
  }
}
