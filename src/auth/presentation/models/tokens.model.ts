import { ApiProperty } from '@nestjs/swagger';

export class TokensModel {
  @ApiProperty()
  public accessToken: string;

  @ApiProperty()
  public refreshToken: string;
}
