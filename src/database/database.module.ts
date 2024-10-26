import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from '@unifig/core';
import { ConfigModule } from '@unifig/nest';

import { AppOptions } from '../app.options';
import { SeedOptions } from './seed.options';
import { SeedService } from './seed.service';
import { UserEntity, UserSchema } from '../user/infrastructure/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ default: AppOptions }),
    ConfigModule.forFeature(SeedOptions),
    MongooseModule.forRoot(Config.getValues(AppOptions).mongoUri),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  providers: [SeedService],
})
export class DatabaseModule {}
