import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hashSync } from 'bcryptjs';

import { AbstractEntity, UserRoles } from '../../../common';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserEntity extends AbstractEntity {
  @Prop({
    required: true,
    unique: true,
    set: (v: string) => v.toLowerCase(),
  })
  public email: string;

  @Prop({
    required: true,
    set: (v: string) => hashSync(v, 10),
  })
  public password: string;

  @Prop({
    type: String,
    enum: UserRoles,
    default: UserRoles.CUSTOMER,
  })
  public role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
