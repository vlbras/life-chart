import { AbstractModel, UserRoles } from '#common';

export type User = AbstractModel & {
  email: string;
  password: string;
  role: UserRoles;
};
