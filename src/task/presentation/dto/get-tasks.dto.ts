import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { TasksTimeRange } from '#task/domain/enums';

export class GetTasksDto {
  @ApiProperty({ enum: TasksTimeRange })
  @IsEnum(TasksTimeRange)
  public readonly timeRange: TasksTimeRange;
}
