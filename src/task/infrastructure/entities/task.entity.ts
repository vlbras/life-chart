import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractEntity } from '../../../common';
import { TaskPriorities, TaskTypes } from '../../domain/enums';

@Schema({
  collection: 'tasks',
  timestamps: true,
})
export class TaskEntity extends AbstractEntity {
  @Prop({ required: true })
  public title: string;

  @Prop()
  public description?: string;

  @Prop({ required: true })
  public points: number;

  @Prop({ type: String, enum: TaskPriorities, required: true })
  public priority: TaskPriorities;

  @Prop({ type: String, enum: TaskTypes, required: true })
  public type: TaskTypes;

  @Prop({ type: Boolean })
  public isCompleted?: boolean;

  @Prop({ type: Boolean, default: false })
  public isRegular: boolean;

  @Prop({ required: true, index: true })
  public userId: string;

  @Prop({ type: Date, default: Date.now, index: true })
  public createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(TaskEntity);
