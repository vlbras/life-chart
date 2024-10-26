import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from '@unifig/core';
import { ConfigModule } from '@unifig/nest';

import { AppOptions } from './app.options';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ default: AppOptions }),
    MongooseModule.forRoot(Config.getValues(AppOptions).mongoUri),
    UserModule,
  ],
})
export class AppModule {}
