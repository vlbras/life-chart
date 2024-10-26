import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserCommand } from './update-user.command';

import { User } from '#user/domain/models';
import { UserCommandRepository } from '#user/infrastructure/repositories/';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand, User> {
  public constructor(private readonly userRepository: UserCommandRepository) {}

  private readonly logger = new Logger(UpdateUserCommandHandler.name);

  public async execute(command: UpdateUserCommand): Promise<User> {
    const { id, ...data } = command.input;
    const { password: _, ...safeCommandData } = data;
    this.logger.debug(`Start updating user ${JSON.stringify({ id, ...safeCommandData })}`);

    const user = await this.userRepository.updateOne({ _id: id }, data);

    const { password: __, ...safeUserData } = user;
    this.logger.debug(`User successfully updated ${JSON.stringify(safeUserData)}`);
    return user;
  }
}
