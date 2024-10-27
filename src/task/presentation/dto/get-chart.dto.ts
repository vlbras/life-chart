import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { IsObjectId } from 'nestjs-object-id';

import { ChartTimeRange } from '#task/domain/enums';

export class GetChartDto {
  @ApiProperty()
  @IsObjectId()
  public readonly userId: string;

  @ApiProperty({ enum: ChartTimeRange })
  @IsEnum(ChartTimeRange)
  public readonly timeRange: ChartTimeRange;
}
