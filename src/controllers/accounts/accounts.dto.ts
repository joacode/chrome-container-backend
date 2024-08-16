import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { AccountType } from '../../entities/accounts/domain/account';
import {
  CreateEntity,
  UpdateEntity,
} from '../../entities/common/domain/base-entity';
import { BaseDTO } from '../common/base.dto';

export enum ACCOUNTS_ERROR_MAPPER {
  NOT_FOUND = 'accounts.not-found',
  BAD_REQUEST = 'accounts.bad-request',
  INTERNAL_SERVER_ERROR = 'accounts.internal-server-error',
}

export class AccountDto {
  @IsUUID()
  @ApiProperty()
  id!: string;

  @IsString()
  @ApiProperty({ type: String })
  email!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  password?: string;

  @IsString()
  @ApiProperty({ type: String })
  primary_name!: string;

  @IsString()
  @ApiProperty({ type: String })
  last_name!: string;

  @IsEnum(AccountType)
  @ApiProperty({ enum: AccountType, enumName: 'AccountType' })
  type!: AccountType;
}

export class AccountsListApiResponse extends BaseDTO<AccountDto[]> {
  @ApiPropertyOptional({ type: AccountDto, isArray: true })
  @IsOptional()
  data?: AccountDto[];

  @ApiPropertyOptional()
  @IsOptional()
  error?: string;
}

export class AccountsApiResponse extends BaseDTO<AccountDto> {
  @ApiPropertyOptional({ type: AccountDto })
  @IsOptional()
  data?: AccountDto;

  @ApiPropertyOptional()
  @IsOptional()
  error?: string;
}

export class CreateAccountDto implements CreateEntity<AccountDto> {
  @IsString()
  @ApiProperty({ type: String })
  email!: string;

  @IsString()
  @ApiProperty({ type: String })
  password!: string;

  @IsString()
  @ApiProperty({ type: String })
  primary_name!: string;

  @IsString()
  @ApiProperty({ type: String })
  last_name!: string;

  @IsEnum(AccountType)
  @ApiProperty({ enum: AccountType, enumName: 'AccountType' })
  type!: AccountType;
}

export class UpdateAccountDto implements UpdateEntity<Partial<AccountDto>> {
  @IsUUID()
  @ApiProperty()
  id!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  email!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  password!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  primary_name!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  last_name!: string;

  @IsEnum(AccountType)
  @IsOptional()
  @ApiPropertyOptional({ enum: AccountType, enumName: 'AccountType' })
  type!: AccountType;
}
