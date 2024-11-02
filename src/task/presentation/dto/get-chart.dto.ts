import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { ChartTimeRange } from '#task/domain/enums';

export class GetChartDto {
  @ApiProperty({ enum: ChartTimeRange })
  @IsEnum(ChartTimeRange)
  public readonly timeRange: ChartTimeRange;
}
