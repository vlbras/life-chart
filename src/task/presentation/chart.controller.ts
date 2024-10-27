import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetChartDto } from './dto';
import { BarModel } from './models';

import { ChartService } from '#task/application/services/chart.service';

@ApiTags('chart')
@Controller('chart')
export class ChartController {
  public constructor(public readonly chartService: ChartService) {}

  @ApiOperation({ summary: 'Get chart' })
  @ApiOkResponse({ type: BarModel, isArray: true })
  @Get()
  public async getChart(dto: GetChartDto): Promise<BarModel[]> {
    // TODO: call ChartService
    // map timeRange to certain date (date-fns library)
    // pass created date to chartRepository.getChart()
    return [];
  }
}
