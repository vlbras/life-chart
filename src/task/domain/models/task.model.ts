import { TaskPriorities, TaskTypes } from '../enums';

import { AbstractModel } from '#common';

export type Task = AbstractModel & {
  title: string;
  description?: string;
  points: number;
  priority: TaskPriorities;
  type: TaskTypes;
  isCompleted?: boolean;
  userId: string;
};
