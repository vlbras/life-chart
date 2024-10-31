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

  public async create(input: CreateTaskInput): Promise<Task> {
    const task = await this.taskEntity.create(input);
    return TaskMapper.mapEntityToModel(task);
  }

  public async createMany(input: CreateTaskInput[]): Promise<number> {
    return (await this.taskEntity.insertMany(input)).length;
  }

  public async updateOne(id: string, data: UpdateTaskInput): Promise<Task> {
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

  public async updateMany(input: FilterTaskInput, data: UpdateTaskInput): Promise<number> {
    const filter = this.filterQueryBuilder(input);
    return (await this.taskEntity.updateMany(filter, data)).modifiedCount;
  }

  public async findOne(input: { id: string }): Promise<Task | null> {
    const filter: Partial<TaskEntity> = { _id: new Types.ObjectId(input.id) };
    const task = await this.taskEntity.findOne(filter).lean().exec();

    return task ? TaskMapper.mapEntityToModel(task) : null;
  }

  public async findMany(input: FilterTaskInput): Promise<Task[]> {
    const filter = this.filterQueryBuilder(input);

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

  private filterQueryBuilder(input: FilterTaskInput): FilterQuery<TaskEntity> {
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

type CreateTaskInput = {
  title: string;
  description?: string;
  priority: TaskPriorities;
  points: number;
  type: TaskTypes;
  isRegular?: boolean;
  userId: string;
};

type UpdateTaskInput = {
  title?: string;
  description?: string;
  points?: number;
  priority?: TaskPriorities;
  type?: TaskTypes;
  isCompleted?: boolean;
  isRegular?: boolean;
};

type FilterTaskInput = {
  userId?: string;
  type?: TaskTypes;
  isCompleted?: boolean | { $exists: boolean };
  isRegular?: boolean;
  createdAfter?: Date;
};
