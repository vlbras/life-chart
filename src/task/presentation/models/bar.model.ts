import { ApiProperty } from '@nestjs/swagger';

export class BarModel {
  @ApiProperty({
    type: [Number],
    example: [10, 25],
  })
  public readonly position: [number, number];

  @ApiProperty({
    description: 'dd.mm.yy',
    example: '31.12.24',
  })
  public readonly date: string;
}
