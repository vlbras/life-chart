import { AuthGuard } from '@nestjs/passport';

import { JwtTokenTypes } from '#auth/domain/enums';

export class RefreshTokenGuard extends AuthGuard(JwtTokenTypes.REFRESH) {
  public constructor() {
    super();
  }
}
