import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from './create-user.command';

import { UserRoles } from '#common';
import { User } from '#user/domain/models';
import { UserCommandRepository } from '#user/infrastructure/repositories';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, User> {
  public constructor(private readonly userRepository: UserCommandRepository) {}

  private readonly logger = new Logger(CreateUserCommandHandler.name);

  public async execute(command: CreateUserCommand): Promise<User> {
    const data = {
      ...command.input,
      role: command.input.role || UserRoles.CUSTOMER,
    };

    const { password: _, ...safeCommandData } = data;
    this.logger.debug(`Start creating user ${JSON.stringify(safeCommandData)}`);

    const user = await this.userRepository.create(data);

    const { password: __, ...safeUserData } = user;
    this.logger.debug(`User successfully created ${JSON.stringify(safeUserData)}`);
    return user;
  }
}
