import { UserRoles } from '#common';

export type RefreshToken = {
  id: string;
  userId: string;
  role: UserRoles;
};
