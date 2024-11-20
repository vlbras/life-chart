import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

import { FilterTaskInput, TaskQueryBuilder } from './task.query-builder';
import { TaskEntity } from '../entities/task.entity';
import { TaskMapper } from '../mappers/task.mapper';

import { TaskPriorities, TaskTypes } from '#task/domain/enums';
import { Task } from '#task/domain/models';

@Injectable()
export class TaskCommandRepository {
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

  public async updateOne(input: { id: string; createdAfter?: Date }, data: UpdateTaskInput): Promise<Task> {
    if (Object.keys(data).length === 0) {
      throw new BadRequestException('No data provided');
    }

    const filter: FilterQuery<TaskEntity> = { _id: new Types.ObjectId(input.id) };
    input.createdAfter && (filter.createdAt = { $gt: input.createdAfter });

    const updateData: UpdateQuery<TaskEntity> = { ...data };
    if (data.isCompleted === null) {
      updateData.$unset = updateData.$unset || { isCompleted: '' };
      delete updateData.isCompleted;
    }

    const task = await this.taskEntity.findOneAndUpdate(filter, updateData, { lean: true, new: true }).exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return TaskMapper.mapEntityToModel(task);
  }

  public async updateMany(input: FilterTaskInput, data: UpdateTaskInput): Promise<number> {
    const filter = TaskQueryBuilder.filterQueryBuilder(input);
    return (await this.taskEntity.updateMany(filter, data)).modifiedCount;
  }

  public async deleteOne(id: string): Promise<void> {
    const filter: Partial<TaskEntity> = { _id: new Types.ObjectId(id) };
    const task = await this.taskEntity.findOneAndDelete(filter).exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }
  }

  public async deleteMany(input: FilterTaskInput): Promise<number> {
    const filter = TaskQueryBuilder.filterQueryBuilder(input);
    return (await this.taskEntity.deleteMany(filter)).deletedCount;
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
  isCompleted?: boolean | null;
  isRegular?: boolean;
};
