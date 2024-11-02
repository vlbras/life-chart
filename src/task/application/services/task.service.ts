import { Injectable } from '@nestjs/common';

import { ActionResponse, getMaxDate, getStartOfDay } from '#common';
import { TasksTimeRange } from '#task/domain/enums';
import { Task } from '#task/domain/models';
import { TaskCommandRepository, TaskQueryRepository } from '#task/infrastructure/repositories';
import { ChangeTaskStatusDto, CreateTaskDto, GetTasksDto, UpdateTaskDto } from '#task/presentation/dto';

@Injectable()
export class TaskService {
  public constructor(
    public readonly commandRepository: TaskCommandRepository,
    public readonly queryRepository: TaskQueryRepository,
  ) {}

  public async findMany(userId: string, data: GetTasksDto): Promise<Task[]> {
    const timeRangeToDate: Record<TasksTimeRange, Date> = {
      [TasksTimeRange.TODAY]: getStartOfDay(),
      [TasksTimeRange.MAX]: getMaxDate(),
    };
    const createdAfter = timeRangeToDate[data.timeRange];

    return this.queryRepository.findMany({ userId, createdAfter });
  }

  public async findOne(id: string): Promise<Task> {
    return this.queryRepository.findOneOrThrow(id);
  }

  public async create(userId: string, data: CreateTaskDto): Promise<ActionResponse> {
    const task = await this.commandRepository.create({ ...data, userId });
    return { id: task.id };
  }

  public async updateOne(id: string, data: UpdateTaskDto): Promise<ActionResponse> {
    const task = await this.commandRepository.updateOne({ id }, data);
    return { id: task.id };
  }

  public async deleteOne(id: string): Promise<ActionResponse> {
    await this.commandRepository.deleteOne(id);
    return { id };
  }

  public async changeStatus(id: string, data: ChangeTaskStatusDto): Promise<ActionResponse> {
    const task = await this.commandRepository.updateOne(
      { id, createdAfter: getStartOfDay() },
      { isCompleted: data.isCompleted },
    );

    return { id: task.id };
  }
}
