import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AccessTokenPayload } from '../interfaces';

export const CurrentUserId = createParamDecorator((_: undefined, context: ExecutionContext): string => {
  const request = context.switchToHttp().getRequest();
  const user = request.user as AccessTokenPayload;

  return user.userId;
});
