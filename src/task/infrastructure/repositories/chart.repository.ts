import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format } from 'date-fns';
import { FilterQuery, Model } from 'mongoose';

import { TaskEntity } from '../entities/task.entity';

import { TaskTypes } from '#task/domain/enums';
import { Bar, Chart } from '#task/domain/models';

@Injectable()
export class ChartRepository {
  public constructor(
    @InjectModel(TaskEntity.name)
    private readonly taskEntity: Model<TaskEntity>,
  ) {}

  public async getChart(userId: string, startDate?: Date): Promise<Chart> {
    const filter: FilterQuery<TaskEntity> = {};
    if (startDate) {
      filter.createdAt = { $gt: startDate };
    }
    filter.isCompleted = { $exists: true };
    filter.userId = userId;

    const tasks: TaskEntity[] = await this.taskEntity
      .find(filter, {
        points: 1,
        type: 1,
        isCompleted: 1,
        createdAt: 1,
      })
      .sort({ createdAt: 1 })
      .exec();

    const chart: Chart = [];
    const dailyTotals: Record<string, number[]> = {};

    let previousY1 = 0;

    for (const task of tasks) {
      const dateKey = format(new Date(task.createdAt), 'dd.MM.yy');
      const points = task.isCompleted ? task.points : -task.points;

      if (!dailyTotals[dateKey]) {
        dailyTotals[dateKey] = [0, 0];
      }

      if (task.type === TaskTypes.POSITIVE) {
        dailyTotals[dateKey][1] += points;
      } else if (task.type === TaskTypes.NEGATIVE) {
        dailyTotals[dateKey][1] -= points;
      }

      if (!chart.length || chart[chart.length - 1].date !== dateKey) {
        const bar: Bar = {
          position: [previousY1, previousY1 + dailyTotals[dateKey][1]],
          date: dateKey,
        };
        chart.push(bar);
        previousY1 += dailyTotals[dateKey][1];
      }
    }

    return chart;
  }
}
