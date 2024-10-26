import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { RefreshTokenPayload } from '#auth/domain/interfaces';

export const RefreshToken = createParamDecorator(
  (data: keyof RefreshTokenPayload | undefined, context: ExecutionContext): RefreshTokenPayload | string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as RefreshTokenPayload;
    if (data) return user[data];

    return user;
  },
);
