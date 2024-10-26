import { Module } from '@nestjs/common';

import { UserIntegrationService } from './user-integration.service';

import { UserApplicationModule } from '#user/application/user-application.module';

@Module({ imports: [UserApplicationModule], providers: [UserIntegrationService], exports: [UserIntegrationService] })
export class UserIntegrationModule {}
