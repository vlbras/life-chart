import { ApiProperty } from '@nestjs/swagger';

export class ActionResponse {
  @ApiProperty()
  public id: string;
}
