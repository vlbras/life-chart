import { ApiProperty } from '@nestjs/swagger';

import { BaseSwaggerModel, UserRoles } from '#common';

export class UserModel extends BaseSwaggerModel {
  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly password: string;

  @ApiProperty({ enum: UserRoles, default: UserRoles.CUSTOMER })
  public readonly role: UserRoles;
}
