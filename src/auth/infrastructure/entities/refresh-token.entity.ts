import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { UserRoles } from '#common';

@Schema({
  collection: 'refreshTokens',
})
export class RefreshTokenEntity {
  public _id: Types.ObjectId;

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    type: String,
    enum: UserRoles,
    required: true,
  })
  public role: UserRoles;

  @Prop({ type: Date, index: { expires: '7d' } })
  public createdAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenEntity);
