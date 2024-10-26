import { applyDecorators, CanActivate, ExecutionContext, Injectable, SetMetadata, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRoles } from '../enums';

import { AccessTokenPayload } from '#auth/domain/interfaces';

export function AuthRoles(...roles: UserRoles[]): any {
  return applyDecorators(Roles(...roles), UseGuards(RolesGuard));
}

@Injectable()
class RolesGuard implements CanActivate {
  public constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.getAllAndOverride<UserRoles>(rolesMetadataKey, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const user = request.user as AccessTokenPayload;
      return role.includes(user.role);
    }

    return false;
  }
}

const Roles = (...roles: UserRoles[]): any => SetMetadata(rolesMetadataKey, roles);

const rolesMetadataKey = 'roles';
