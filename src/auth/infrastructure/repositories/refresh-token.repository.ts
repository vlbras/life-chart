import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { RefreshTokenMapper } from '../mappers/refresh-token.mapper';

import { RefreshToken } from '#auth/domain/models';

@Injectable()
export class RefreshTokenRepository {
  public constructor(
    @InjectModel(RefreshTokenEntity.name)
    private readonly refreshTokenEntity: Model<RefreshTokenEntity>,
  ) {}

  private readonly logger = new Logger(RefreshTokenRepository.name);

  public create(refreshToken: RefreshTokenEntity): void {
    this.refreshTokenEntity.create(refreshToken);
  }

  public async findOneAndDelete(id: string): Promise<RefreshToken | null> {
    const refreshToken = await this.refreshTokenEntity.findByIdAndDelete(id);

    if (!refreshToken) {
      this.logger.error(`Refresh token not found, id: ${id}`);

      return null;
    }

    return RefreshTokenMapper.mapEntityToModel(refreshToken);
  }

  public async deleteMany(userId: string): Promise<void> {
    await this.refreshTokenEntity.deleteMany({ userId });
  }
}
