import { From, Nested, Secret } from '@unifig/core';
import { IsNotEmpty } from 'class-validator';

class AccessTokenOptions {
  @From({ key: 'JWT_ACCESS_SECRET' })
  @Secret()
  @IsNotEmpty()
  public secret: string;

  @From({ key: 'JWT_ACCESS_TTL' })
  @IsNotEmpty()
  public ttl: string;
}

class RefreshTokenOptions {
  @From({ key: 'JWT_REFRESH_SECRET' })
  @Secret()
  @IsNotEmpty()
  public secret: string;

  @From({ key: 'JWT_REFRESH_TTL' })
  @IsNotEmpty()
  public ttl: string;
}

export class JwtOptions {
  @Nested(() => AccessTokenOptions)
  public access: AccessTokenOptions;

  @Nested(() => RefreshTokenOptions)
  public refresh: RefreshTokenOptions;

  @From({ key: 'JWT_AUDIENCE' })
  @IsNotEmpty()
  public audience: string;

  @From({ key: 'JWT_ISSUER' })
  @IsNotEmpty()
  public issuer: string;
}
