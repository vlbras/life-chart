import { BadRequestException, Injectable } from '@nestjs/common';
import { startOfToday, subDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import { berlinTimeZone, getMaxDate } from '#common';
import { ChartTimeRange } from '#task/domain/enums';
import { Chart } from '#task/domain/models';
import { ChartRepository } from '#task/infrastructure/repositories';
import { GetChartDto } from '#task/presentation/dto';

@Injectable()
export class ChartService {
  public constructor(public readonly chartRepository: ChartRepository) {}

  public async getChart(userId: string, data: GetChartDto): Promise<Chart> {
    const startDate = this.mapTimeRangeToStartDate(data.timeRange);
    return this.chartRepository.getChart(userId, startDate);
  }

  private mapTimeRangeToStartDate = (timeRange: ChartTimeRange): Date => {
    const todayStart = toZonedTime(startOfToday(), berlinTimeZone);

    switch (timeRange) {
      case ChartTimeRange['7_DAYS']:
        const sevenDaysStart = subDays(todayStart, 6);
        sevenDaysStart.setUTCHours(0, 0, 0, 0);
        return toZonedTime(sevenDaysStart, berlinTimeZone);

      case ChartTimeRange.THIS_WEEK:
        const startOfWeek = new Date(todayStart);
        const day = startOfWeek.getUTCDay();
        const diff = day === 0 ? 6 : day - 1;
        startOfWeek.setUTCDate(startOfWeek.getUTCDate() - diff);
        startOfWeek.setUTCHours(0, 0, 0, 0);
        return toZonedTime(startOfWeek, berlinTimeZone);

      case ChartTimeRange['30_DAYS']:
        const thirtyDaysStart = subDays(todayStart, 29);
        thirtyDaysStart.setUTCHours(0, 0, 0, 0);
        return toZonedTime(thirtyDaysStart, berlinTimeZone);

      case ChartTimeRange.THIS_MONTH:
        const startOfMonth = new Date(todayStart);
        startOfMonth.setUTCDate(1);
        startOfMonth.setUTCHours(0, 0, 0, 0);
        return toZonedTime(startOfMonth, berlinTimeZone);

      case ChartTimeRange.MAX:
        return getMaxDate();

      default:
        throw new BadRequestException('Invalid time range');
    }
  };
}
