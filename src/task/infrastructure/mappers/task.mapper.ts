import { TaskEntity } from '../entities/task.entity';

import { Task } from '#task/domain/models';

export class TaskMapper {
  public static mapEntityToModel(entity: TaskEntity): Task {
    return {
      id: entity._id.toString(),
      title: entity.title,
      description: entity.description,
      points: entity.points,
      priority: entity.priority,
      type: entity.type,
      isCompleted: entity.isCompleted,
      userId: entity.userId,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
