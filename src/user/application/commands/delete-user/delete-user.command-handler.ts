import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { DeleteUserCommand } from './delete-user.command';

import { UserCommandRepository } from '#user/infrastructure/repositories';
import { UserDeletedEvent, userDeletedNS } from '#user/integration/events';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand, void> {
  public constructor(
    private readonly userRepository: UserCommandRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventBus: EventBus,
  ) {}

  private readonly logger = new Logger(DeleteUserCommandHandler.name);

  public async execute(command: DeleteUserCommand): Promise<void> {
    const { input } = command;
    this.logger.debug(`Start deleting user ${JSON.stringify(input)}`);

    await this.userRepository.findOneAndDelete({ _id: input.id });

    const userDeletedEvent = new UserDeletedEvent(input.id);

    // Approach 1: Using EventBus (from @nestjs/cqrs)
    // The EventBus is part of the CQRS pattern.
    // It publishes the event to the bus, and the event is routed to the appropriate handler(s)
    // More structured, Based on the event type.
    // Does not support wildcards.
    // Supports Event Sourcing (events can be stored and replayed to rebuild state).
    this.eventBus.publish(userDeletedEvent);

    // Approach 2: Using EventEmitter (from @nestjs/event-emitter)
    // Lightweight and Simple, the EventEmitter is not tied to the CQRS pattern.
    // The event is emitted to all listeners, with no routing based on event type.
    // Supports namespaces and wildcards for event matching.
    // Does not support Event Sourcing (events are not stored or replayed).
    this.eventEmitter.emit(userDeletedNS, userDeletedEvent);

    this.logger.debug(`User successfully deleted ${JSON.stringify(input)}`);
  }
}
