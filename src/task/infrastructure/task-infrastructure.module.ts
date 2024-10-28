import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskEntity, TaskSchema } from './entities/task.entity';
import { ChartRepository, TaskRepository } from './repositories';

@Module({
  imports: [MongooseModule.forFeature([{ name: TaskEntity.name, schema: TaskSchema }])],
  providers: [TaskRepository, ChartRepository],
  exports: [TaskRepository, ChartRepository],
})
export class TaskInfrastructureModule {}
