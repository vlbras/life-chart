import { Optional } from '@nestjs/common';
import { IsEmail, IsMongoId } from 'class-validator';

export class FindUserDto {
  @Optional()
  @IsMongoId()
  public id?: string;

  @Optional()
  @IsEmail()
  public email?: string;
}
