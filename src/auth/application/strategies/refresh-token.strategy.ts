import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigContainer } from '@unifig/core';
import { InjectConfig } from '@unifig/nest';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtTokenTypes } from '#auth/domain/enums';
import { JwtOptions } from '#auth/jwt.options';
import { RefreshTokenPayload } from '#common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, JwtTokenTypes.REFRESH) {
  public constructor(
    @InjectConfig(JwtOptions)
    private readonly config: ConfigContainer<JwtOptions>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.values.refresh.secret,
      audience: config.values.audience,
      issuer: config.values.issuer,
      ignoreExpiration: false,
    });
  }

  public validate(payload: RefreshTokenPayload): RefreshTokenPayload {
    return payload;
  }
}
