import { Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export abstract class AbstractEntity {
  public _id: Types.ObjectId;
  public createdAt: Date;
  public updatedAt: Date;
}
