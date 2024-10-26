import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';

import { UserRoles } from '#common';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ minLength: 8 })
  @MinLength(8)
  public readonly password: string;

  @ApiPropertyOptional({ enum: UserRoles })
  @IsOptional()
  @IsEnum(UserRoles)
  public readonly role?: UserRoles;
}
