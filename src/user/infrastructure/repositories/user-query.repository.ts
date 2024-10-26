import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

import { AbstractQueryRepository } from '#common';
import { User } from '#user/domain/models';

@Injectable()
export class UserQueryRepository extends AbstractQueryRepository<UserEntity, User, UserMapper> {
  public constructor(
    @InjectModel(UserEntity.name)
    private readonly userEntity: Model<UserEntity>,
    private readonly userMapper: UserMapper,
  ) {
    super(userEntity, userMapper);
  }
}
