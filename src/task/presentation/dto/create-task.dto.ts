import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

import { TaskPriorities, TaskTypes } from '#task/domain/enums';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @ApiPropertyOptional({
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public readonly description?: string;

  @ApiProperty({
    minimum: 1,
    maximum: 100,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  public readonly points: number;

  @ApiProperty({ enum: TaskPriorities })
  @IsEnum(TaskPriorities)
  public readonly priority: TaskPriorities;

  @ApiProperty({ enum: TaskTypes })
  @IsEnum(TaskTypes)
  public readonly type: TaskTypes;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  public readonly isRegular?: boolean;
}
