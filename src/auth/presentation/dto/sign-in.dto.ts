import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  public readonly email: string;

  @ApiProperty({ minLength: 8 })
  @MinLength(8)
  public readonly password: string;
}
