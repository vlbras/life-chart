import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TaskPriorities, TaskTypes } from '#task/domain/enums';

export class TaskModel {
  @ApiProperty()
  public readonly id: string;

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

  @ApiProperty()
  public readonly userId: string;

  @ApiProperty()
  public readonly createdAt: string;

  @ApiProperty()
  public readonly updatedAt: string;
}
