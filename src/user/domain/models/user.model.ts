import { UserRoles } from '#common';

export type User = {
  id: string;
  email: string;
  password: string;
  role: UserRoles;
  createdAt: string;
  updatedAt: string;
};
