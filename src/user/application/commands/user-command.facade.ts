import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateUserCommand, DeleteUserCommand, UpdateUserCommand } from '.';

import { User } from '#user/domain/models';

@Injectable()
export class UserCommandFacade {
  public constructor(private readonly commandBud: CommandBus) {}

  public async create(command: CreateUserCommand): Promise<User> {
    return this.commandBud.execute(command);
  }

  public async updateOne(command: UpdateUserCommand): Promise<User> {
    return this.commandBud.execute(command);
  }

  public async deleteOne(command: DeleteUserCommand): Promise<void> {
    await this.commandBud.execute(command);
  }
}
