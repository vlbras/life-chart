import { Injectable } from '@nestjs/common';

import { CreateUserDto, FindUserDto } from './dto';

import { CreateUserCommand, UserCommandFacade } from '#user/application/commands';
import { FindUserQuery, UserQueryFacade } from '#user/application/queries';
import { User } from '#user/domain/models';

@Injectable()
export class UserIntegrationService {
  public constructor(
    private readonly userCommandFacade: UserCommandFacade,
    private readonly userQueryFacade: UserQueryFacade,
  ) {}

  public async create(payload: CreateUserDto): Promise<string> {
    const command = new CreateUserCommand(payload);
    const user = await this.userCommandFacade.create(command);
    return user.id;
  }

  public async findOne(payload: FindUserDto): Promise<User> {
    const query = new FindUserQuery(payload);
    return this.userQueryFacade.findOne(query);
  }
}
