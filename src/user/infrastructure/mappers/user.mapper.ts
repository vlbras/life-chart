import { UserEntity } from '../entities/user.entity';

import { AbstractMapper } from '#common';
import { User } from '#user/domain/models';

export class UserMapper extends AbstractMapper<UserEntity, User> {
  public mapEntityToModel(entity: UserEntity): User {
    return {
      id: entity._id.toString(),
      email: entity.email,
      password: entity.password,
      role: entity.role,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
