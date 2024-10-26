import { ApiProperty } from '@nestjs/swagger';

import { UserRoles } from '#common';

export class UserModel {
  @ApiProperty()
  public readonly id: string;

  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly password: string;

  @ApiProperty({ enum: UserRoles, default: UserRoles.CUSTOMER })
  public readonly role: UserRoles;
}
