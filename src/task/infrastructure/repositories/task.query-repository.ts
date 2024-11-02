import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { FilterTaskInput, TaskQueryBuilder } from './task.query-builder';
import { TaskEntity } from '../entities/task.entity';
import { TaskMapper } from '../mappers/task.mapper';

import { Task } from '#task/domain/models';

@Injectable()
export class TaskQueryRepository {
  public constructor(
    @InjectModel(TaskEntity.name)
    private readonly taskEntity: Model<TaskEntity>,
  ) {}

  public async findOne(id: string): Promise<Task | null> {
    const filter: Partial<TaskEntity> = { _id: new Types.ObjectId(id) };
    const task = await this.taskEntity.findOne(filter).lean().exec();

    return task ? TaskMapper.mapEntityToModel(task) : null;
  }

  public async findOneOrThrow(id: string): Promise<Task> {
    const task = await this.findOne(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  public async findMany(input: FilterTaskInput): Promise<Task[]> {
    const filter = TaskQueryBuilder.filterQueryBuilder(input);

    const tasks = await this.taskEntity.find(filter).sort({ createdAt: -1 }).lean().exec();
    return tasks.map(TaskMapper.mapEntityToModel);
  }
}
