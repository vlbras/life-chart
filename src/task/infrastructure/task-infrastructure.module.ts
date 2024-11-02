import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskEntity, TaskSchema } from './entities/task.entity';
import { ChartRepository, TaskCommandRepository, TaskQueryRepository } from './repositories';

@Module({
  imports: [MongooseModule.forFeature([{ name: TaskEntity.name, schema: TaskSchema }])],
  providers: [TaskQueryRepository, TaskCommandRepository, ChartRepository],
  exports: [TaskQueryRepository, TaskCommandRepository, ChartRepository],
})
export class TaskInfrastructureModule {}
