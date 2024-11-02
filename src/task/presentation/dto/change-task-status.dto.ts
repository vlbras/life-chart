import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

import { IsNullable } from '#common';

export class ChangeTaskStatusDto {
  @ApiProperty({ type: Boolean, nullable: true, description: '"null" removes status' })
  @IsBoolean()
  @IsNullable()
  public readonly isCompleted: boolean | null;
}
