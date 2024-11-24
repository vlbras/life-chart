import { UserRoles } from '../enums';

export interface RefreshTokenPayload {
  id: string;
}

export interface AccessTokenPayload {
  userId: string;
  role: UserRoles;
}
