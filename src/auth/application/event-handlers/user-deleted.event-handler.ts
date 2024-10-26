import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { RefreshTokenRepository } from '#auth/infrastructure/repositories';
import { UserDeletedEvent } from '#user/integration/events';

@EventsHandler(UserDeletedEvent)
export class UserDeletedEventHandler implements IEventHandler<UserDeletedEvent> {
  public constructor(private readonly refreshTokenRepository: RefreshTokenRepository) {}

  public handle(event: UserDeletedEvent): void {
    this.refreshTokenRepository.deleteMany(event.userId);
  }
}
