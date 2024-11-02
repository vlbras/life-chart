import { Body, Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetChartDto } from './dto';
import { BarModel } from './models';

import { CurrentUserId } from '#common';
import { ChartService } from '#task/application/services/chart.service';

@ApiTags('chart')
@Controller('chart')
export class ChartController {
  public constructor(public readonly chartService: ChartService) {}

  @ApiOperation({ summary: 'Get chart' })
  @ApiOkResponse({ type: BarModel, isArray: true })
  @Get()
  public async getChart(@CurrentUserId() userId: string, @Query() dto: GetChartDto): Promise<BarModel[]> {
    return this.chartService.getChart(userId, dto);
  }
}
