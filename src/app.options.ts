import { From, Secret } from '@unifig/core';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AppOptions {
  @From({ key: 'PORT', default: 3000 })
  @IsInt()
  public port: number;

  @From('MONGO_URI')
  @Secret()
  @IsNotEmpty()
  public mongoUri: string;
}
