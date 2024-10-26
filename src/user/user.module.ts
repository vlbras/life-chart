import { Module } from '@nestjs/common';

import { UserApplicationModule } from './application/user-application.module';
import { UserCommandController } from './presentation/user-command.controller';
import { UserQueryController } from './presentation/user-query.controller';

@Module({
  imports: [UserApplicationModule],
  controllers: [UserCommandController, UserQueryController],
})
export class UserModule {}
