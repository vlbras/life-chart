import { RefreshToken } from '../models';

export class RefreshTokenGeneratedEvent {
  public constructor(public readonly refreshToken: RefreshToken) {}
}
