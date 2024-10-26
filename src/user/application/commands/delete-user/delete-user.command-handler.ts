import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { DeleteUserCommand } from './delete-user.command';

import { UserCommandRepository } from '#user/infrastructure/repositories';
import { UserDeletedEvent } from '#user/integration/events';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand, void> {
  public constructor(
    private readonly userRepository: UserCommandRepository,
    private readonly eventBus: EventBus,
  ) {}

  private readonly logger = new Logger(DeleteUserCommandHandler.name);

  public async execute(command: DeleteUserCommand): Promise<void> {
    const { input } = command;
    this.logger.debug(`Start deleting user ${JSON.stringify(input)}`);

    await this.userRepository.deleteOne({ _id: input.id });

    this.eventBus.publish(new UserDeletedEvent(input.id));

    this.logger.debug(`User successfully deleted ${JSON.stringify(input)}`);
  }
}
