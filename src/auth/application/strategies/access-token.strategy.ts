import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigContainer } from '@unifig/core';
import { InjectConfig } from '@unifig/nest';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtTokenTypes } from '#auth/domain/enums';
import { JwtOptions } from '#auth/jwt.options';
import { AccessTokenPayload } from '#common';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, JwtTokenTypes.ACCESS) {
  public constructor(
    @InjectConfig(JwtOptions)
    private readonly config: ConfigContainer<JwtOptions>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.values.access.secret,
      audience: config.values.audience,
      issuer: config.values.issuer,
      ignoreExpiration: false,
    });
  }

  public validate(payload: AccessTokenPayload): AccessTokenPayload {
    return payload;
  }
}
