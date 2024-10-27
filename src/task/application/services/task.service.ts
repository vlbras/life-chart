import { Injectable } from '@nestjs/common';

import { TaskRepository } from '#task/infrastructure/repositories/task.repository';

@Injectable()
export class TaskService {
  public constructor(public readonly taskRepository: TaskRepository) {}
}
