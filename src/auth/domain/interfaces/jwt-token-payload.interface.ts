import { UserRoles } from '#common';

export interface RefreshTokenPayload {
  id: string;
}

export interface AccessTokenPayload {
  userId: string;
  role: UserRoles;
}
