import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ConfigContainer } from '@unifig/core';
import { InjectConfig } from '@unifig/nest';
import { Types } from 'mongoose';

import { RefreshTokenGeneratedEvent } from '#auth/domain/events';
import { Tokens } from '#auth/domain/models';
import { JwtOptions } from '#auth/jwt.options';
import { AccessTokenPayload, RefreshTokenPayload } from '#common';

@Injectable()
export class JwtTokensService {
  public constructor(
    @InjectConfig(JwtOptions)
    private readonly config: ConfigContainer<JwtOptions>,
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBus,
  ) {}

  public async generate(accessTokenPayload: AccessTokenPayload): Promise<Tokens> {
    const { access, refresh } = this.config.values;
    const id = new Types.ObjectId().toString();

    const [accessToken, refreshToken] = await Promise.all([
      this.signAsync(accessTokenPayload, access.secret, access.ttl),
      this.signAsync({ id }, refresh.secret, refresh.ttl),
    ]);

    this.eventBus.publish(new RefreshTokenGeneratedEvent({ id, ...accessTokenPayload }));

    return { accessToken, refreshToken };
  }

  private async signAsync(
    payload: AccessTokenPayload | RefreshTokenPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
      audience: this.config.values.audience,
      issuer: this.config.values.issuer,
    });
  }
}
