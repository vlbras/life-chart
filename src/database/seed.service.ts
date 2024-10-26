import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigContainer } from '@unifig/core';
import { InjectConfig } from '@unifig/nest';
import { Model } from 'mongoose';

import { UserRoles } from '../common';
import { SeedOptions } from './seed.options';
import { UserEntity } from '../user/infrastructure/entities/user.entity';

@Injectable()
export class SeedService {
  public constructor(
    @InjectConfig(SeedOptions)
    private readonly config: ConfigContainer<SeedOptions>,
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
  ) {}

  public async seedUsers(): Promise<void> {
    const { admin, customer } = this.config.values;

    const users = [{ ...admin, role: UserRoles.ADMIN }, customer];

    for (const user of users) {
      const existingUser = await this.userModel.findOne({ email: user.email });
      if (!existingUser) {
        await this.userModel.create(user);
      }
    }
  }
}
