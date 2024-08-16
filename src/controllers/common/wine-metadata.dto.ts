import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import {
  CreateEntity,
  UpdateEntity,
} from '../../entities/common/domain/base-entity';

export class WineMetadataDto {
  @IsUUID()
  @ApiProperty()
  id!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  name?: string;

  @IsString()
  @ApiProperty({ type: String })
  keyword!: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ type: Boolean })
  enabled?: boolean;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  image_url?: string;
}

export class CreateWineMetadataDto implements CreateEntity<WineMetadataDto> {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  name?: string;

  @IsString()
  @ApiProperty({ type: String })
  keyword!: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ type: Boolean })
  enabled?: boolean;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  image_url?: string;
}

export class UpdateWineMetadataDto
  implements UpdateEntity<Partial<WineMetadataDto>>
{
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  name?: string;

  @IsString()
  @ApiProperty({ type: String })
  keyword?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ type: Boolean })
  enabled?: boolean;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  image_url?: string;
}
