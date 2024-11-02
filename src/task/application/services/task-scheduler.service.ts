/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { sub } from 'date-fns';

import { berlinTimeZone } from '#common';
import { TaskTypes } from '#task/domain/enums';
import { TaskCommandRepository, TaskQueryRepository } from '#task/infrastructure/repositories';

@Injectable()
export class TaskSchedulerService {
  public constructor(
    public readonly commandRepository: TaskCommandRepository,
    public readonly queryRepository: TaskQueryRepository,
  ) {}

  private readonly logger = new Logger(TaskSchedulerService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    timeZone: berlinTimeZone,
  })
  public async refreshTasks(): Promise<void> {
    this.logger.debug('Start refreshing tasks');

    const createdAfter = sub(new Date(), { hours: 24 });

    const [positiveTasksCount, negativeTasksCount] = await Promise.all([
      this.commandRepository.updateMany(
        { isCompleted: { $exists: false }, createdAfter, type: TaskTypes.POSITIVE },
        { isCompleted: false },
      ),
      this.commandRepository.updateMany(
        { isCompleted: { $exists: false }, createdAfter, type: TaskTypes.NEGATIVE },
        { isCompleted: true },
      ),
    ]);

    this.logger.log(
      `Set isCompleted for ${positiveTasksCount} ${TaskTypes.POSITIVE} and ${negativeTasksCount} ${TaskTypes.NEGATIVE} tasks`,
    );

    const regularTasks = await this.queryRepository.findMany({ isRegular: true, createdAfter });

    this.logger.log(`Found ${regularTasks.length} regular tasks from the previous day`);

    const regularTasksData = regularTasks.map(({ id, isCompleted, createdAt, updatedAt, ...rest }) => rest);
    const createdTasksCount = await this.commandRepository.createMany(regularTasksData);

    this.logger.log(`Created ${createdTasksCount} regular tasks for current day`);

    this.logger.debug('Successfully refreshed tasks');
  }
}
