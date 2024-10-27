import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';

import { TaskEntity } from '../entities/task.entity';
import { TaskMapper } from '../mappers/task.mapper';

import { TaskPriorities, TaskTypes } from '#task/domain/enums';
import { Task } from '#task/domain/models';

@Injectable()
export class TaskRepository {
  public constructor(
    @InjectModel(TaskEntity.name)
    private readonly taskEntity: Model<TaskEntity>,
  ) {}

  public async create(input: {
    title: string;
    description?: string;
    priority: TaskPriorities;
    points: number;
    type: TaskTypes;
    userId: string;
  }): Promise<Task> {
    const task = await this.taskEntity.create(input);
    return TaskMapper.mapEntityToModel(task);
  }

  public async updateOne(
    id: string,
    data: {
      title?: string;
      description?: string;
      points?: number;
      priority?: TaskPriorities;
      type?: TaskTypes;
      isCompleted?: boolean;
    },
  ): Promise<Task> {
    if (Object.keys(data).length === 0) {
      throw new BadRequestException('No data provided');
    }

    const task = await this.taskEntity
      .findOneAndUpdate({ _id: new Types.ObjectId(id) }, data, { lean: true, new: true })
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return TaskMapper.mapEntityToModel(task);
  }

  public async findOne(input: { id: string }): Promise<Task | null> {
    const filter: Partial<TaskEntity> = { _id: new Types.ObjectId(input.id) };
    const task = await this.taskEntity.findOne(filter).lean().exec();

    return task ? TaskMapper.mapEntityToModel(task) : null;
  }

  public async findMany(userId: string, createdAfter?: Date): Promise<Task[]> {
    const filter: FilterQuery<TaskEntity> = {};

    filter.userId = userId;
    if (createdAfter) {
      filter.createdAt = { $gt: createdAfter };
    }

    const tasks = await this.taskEntity.find(filter).sort({ createdAt: -1 }).lean().exec();
    return tasks.map(TaskMapper.mapEntityToModel);
  }

  public async deleteOne(input: { id: string }): Promise<void> {
    const filter: Partial<TaskEntity> = { _id: new Types.ObjectId(input.id) };
    const task = await this.taskEntity.findOneAndDelete(filter).exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }
  }
}
