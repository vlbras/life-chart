import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TaskService } from '#task/application/services/task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  public constructor(public readonly taskService: TaskService) {}
}
