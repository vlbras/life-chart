import { Module } from '@nestjs/common';

import { ChartService } from './services/chart.service';
import { TaskSchedulerService } from './services/task-scheduler.service';
import { TaskService } from './services/task.service';

import { TaskInfrastructureModule } from '#task/infrastructure/task-infrastructure.module';

@Module({
  imports: [TaskInfrastructureModule],
  providers: [TaskService, ChartService, TaskSchedulerService],
  exports: [TaskService, ChartService],
})
export class TaskApplicationModule {}
