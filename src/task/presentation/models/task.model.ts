import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { BaseSwaggerModel } from '#common';
import { TaskPriorities, TaskTypes } from '#task/domain/enums';

export class TaskModel extends BaseSwaggerModel {
  @ApiProperty()
  public readonly title: string;

  @ApiPropertyOptional()
  public readonly description?: string;

  @ApiProperty()
  public readonly points: number;

  @ApiProperty({ enum: TaskPriorities })
  public readonly priority: TaskPriorities;

  @ApiProperty({ enum: TaskTypes })
  public readonly type: TaskTypes;

  @ApiPropertyOptional()
  public readonly isCompleted?: boolean;

  @ApiProperty({ default: false })
  public readonly isRegular: boolean;

  @ApiProperty()
  public readonly userId: string;
}
