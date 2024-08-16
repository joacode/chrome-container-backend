import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseDTO<T> {
  @ApiProperty()
  abstract data?: T;

  @ApiProperty()
  abstract error?: string;
}
