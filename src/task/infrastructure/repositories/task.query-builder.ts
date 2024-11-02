import { BadRequestException } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import { TaskEntity } from '../entities/task.entity';

import { TaskTypes } from '#task/domain/enums';

export class TaskQueryBuilder {
  public static filterQueryBuilder(input: FilterTaskInput): FilterQuery<TaskEntity> {
    if (Object.keys(input).length === 0) {
      throw new BadRequestException('No data provided');
    }

    const filter: FilterQuery<TaskEntity> = {};

    input.userId && (filter.userId = input.userId);
    input.type && (filter.type = input.type);
    input.isCompleted && (filter.isCompleted = input.isCompleted);
    input.isRegular && (filter.isRegular = input.isRegular);
    input.createdAfter && (filter.createdAt = { $gt: input.createdAfter });

    return filter;
  }
}

export type FilterTaskInput = {
  userId?: string;
  type?: TaskTypes;
  isCompleted?: boolean | { $exists: boolean };
  isRegular?: boolean;
  createdAfter?: Date;
};
