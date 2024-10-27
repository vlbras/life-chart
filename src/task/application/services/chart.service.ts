import { Injectable } from '@nestjs/common';

import { ChartRepository } from '#task/infrastructure/repositories/chart.repository';

@Injectable()
export class ChartService {
  public constructor(public readonly chartRepository: ChartRepository) {}
}
