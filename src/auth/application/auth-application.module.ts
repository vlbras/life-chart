import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@unifig/nest';

import {
  AuthCommandFacade,
  RefreshTokensCommandHandler,
  SignInCommandHandler,
  SignOutCommandHandler,
  SignUpCommandHandler,
} from './commands';
import { RefreshTokenGeneratedEventHandler, UserDeletedEventHandler } from './event-handlers';
import { JwtTokensService } from './services/jwt-tokens.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

import { AuthInfrastructureModule } from '#auth/infrastructure/auth-infrastructure.module';
import { JwtOptions } from '#auth/jwt.options';
import { UserIntegrationModule } from '#user/integration/user-integration.module';

@Module({
  imports: [
    ConfigModule.forFeature(JwtOptions),
    CqrsModule.forRoot(),
    JwtModule,
    AuthInfrastructureModule,
    UserIntegrationModule,
  ],
  providers: [
    AuthCommandFacade,
    JwtTokensService,

    // * strategies * //
    AccessTokenStrategy,
    RefreshTokenStrategy,

    // * command handlers * //
    SignUpCommandHandler,
    SignInCommandHandler,
    SignOutCommandHandler,
    RefreshTokensCommandHandler,

    // * event handlers * //
    RefreshTokenGeneratedEventHandler,
    UserDeletedEventHandler,
  ],
  exports: [AuthCommandFacade],
})
export class AuthApplicationModule {}
