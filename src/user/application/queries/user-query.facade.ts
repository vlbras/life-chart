import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindUserQuery, FindUsersQuery } from '.';

import { User } from '#user/domain/models';

@Injectable()
export class UserQueryFacade {
  public constructor(private readonly queryBus: QueryBus) {}

  public async findMany(query: FindUsersQuery): Promise<User[]> {
    return this.queryBus.execute(query);
  }

  public async findOne(query: FindUserQuery): Promise<User> {
    return this.queryBus.execute(query);
  }
}
