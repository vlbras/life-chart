import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { RefreshTokenGeneratedEvent } from '#auth/domain/events';
import { RefreshTokenMapper } from '#auth/infrastructure/mappers/refresh-token.mapper';
import { RefreshTokenRepository } from '#auth/infrastructure/repositories';

@EventsHandler(RefreshTokenGeneratedEvent)
export class RefreshTokenGeneratedEventHandler implements IEventHandler<RefreshTokenGeneratedEvent> {
  public constructor(private readonly refreshTokenRepository: RefreshTokenRepository) {}

  public handle(event: RefreshTokenGeneratedEvent): void {
    const refreshTokenEntity = RefreshTokenMapper.mapModelToEntity(event.refreshToken);
    this.refreshTokenRepository.create(refreshTokenEntity);
  }
}
