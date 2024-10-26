import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  UpdateUserCommandHandler,
  UserCommandFacade,
} from './commands';
import { FindUserQueryHandler, FindUsersQueryHandler, UserQueryFacade } from './queries';

import { UserInfrastructureModule } from '#user/infrastructure/user-infrastructure.module';

@Module({
  imports: [CqrsModule.forRoot(), UserInfrastructureModule],
  providers: [
    UserCommandFacade,
    UserQueryFacade,

    // * command handlers * //
    CreateUserCommandHandler,
    UpdateUserCommandHandler,
    DeleteUserCommandHandler,

    // * query handlers * //
    FindUsersQueryHandler,
    FindUserQueryHandler,
  ],
  exports: [UserCommandFacade, UserQueryFacade],
})
export class UserApplicationModule {}
