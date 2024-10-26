import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AccessTokenPayload } from '#auth/domain/interfaces';

export const CurrentUser = createParamDecorator(
  (data: keyof AccessTokenPayload | undefined, context: ExecutionContext): AccessTokenPayload | string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as AccessTokenPayload;
    if (data) return user[data];

    return user;
  },
);
