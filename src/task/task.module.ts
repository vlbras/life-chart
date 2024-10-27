import { Module } from '@nestjs/common';

import { TaskApplicationModule } from './application/task-application.module';
import { ChartController } from './presentation/chart.controller';
import { TaskController } from './presentation/task.controller';

@Module({
  imports: [TaskApplicationModule],
  controllers: [TaskController, ChartController],
})
export class TaskModule {}
