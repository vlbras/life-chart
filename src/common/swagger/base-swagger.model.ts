import { ApiProperty } from '@nestjs/swagger';

export class BaseSwaggerModel {
  @ApiProperty()
  public readonly id: string;

  @ApiProperty()
  public readonly createdAt: string;

  @ApiProperty()
  public readonly updatedAt: string;
}
