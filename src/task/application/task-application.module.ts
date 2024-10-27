import { Module } from '@nestjs/common';

import { ChartService } from './services/chart.service';
import { TaskService } from './services/task.service';

import { TaskInfrastructureModule } from '#task/infrastructure/task-infrastructure.module';

@Module({
  imports: [TaskInfrastructureModule],
  providers: [TaskService, ChartService],
  exports: [TaskService, ChartService],
})
export class TaskApplicationModule {}
