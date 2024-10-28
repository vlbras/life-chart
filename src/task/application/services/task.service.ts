import { Injectable } from '@nestjs/common';

import { TaskRepository } from '#task/infrastructure/repositories';

@Injectable()
export class TaskService {
  public constructor(public readonly taskRepository: TaskRepository) {}
}
