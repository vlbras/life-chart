import { Types } from 'mongoose';

import { RefreshTokenEntity } from '../entities/refresh-token.entity';

import { RefreshToken } from '#auth/domain/models';

export class RefreshTokenMapper {
  public static mapEntityToModel(entity: RefreshTokenEntity): RefreshToken {
    return {
      id: entity._id.toString(),
      userId: entity.userId,
      role: entity.role,
    };
  }

  public static mapModelToEntity(model: RefreshToken): RefreshTokenEntity {
    return {
      _id: new Types.ObjectId(model.id),
      userId: model.userId,
      role: model.role,
      createdAt: new Date(),
    };
  }
}
