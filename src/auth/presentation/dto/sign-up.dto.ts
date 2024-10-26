import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ minLength: 8 })
  @MinLength(8)
  public readonly password: string;
}
