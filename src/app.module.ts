import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Config } from '@unifig/core';
import { ConfigModule } from '@unifig/nest';

import { AppOptions } from './app.options';

import { AuthModule } from '#auth/auth.module';
import { AccessTokenGuard } from '#auth/presentation/guards/access-token.guard';
import { TaskModule } from '#task/task.module';
import { UserModule } from '#user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ default: AppOptions }),
    MongooseModule.forRoot(Config.getValues(AppOptions).mongoUri),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    TaskModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
