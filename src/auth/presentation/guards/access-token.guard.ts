import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { JwtTokenTypes } from '#auth/domain/enums';
import { isPublicMetadataKey } from '#common';

@Injectable()
export class AccessTokenGuard extends AuthGuard(JwtTokenTypes.ACCESS) {
  public constructor(private reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(isPublicMetadataKey, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
