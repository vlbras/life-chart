import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RefreshTokenEntity, RefreshTokenSchema } from './entities/refresh-token.entity';
import { RefreshTokenRepository } from './repositories';

@Module({
  imports: [MongooseModule.forFeature([{ name: RefreshTokenEntity.name, schema: RefreshTokenSchema }])],
  providers: [RefreshTokenRepository],
  exports: [RefreshTokenRepository],
})
export class AuthInfrastructureModule {}
