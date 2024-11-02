import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsObjectIdPipe } from 'nestjs-object-id';

import { UserModel } from './models';

import { AuthRoles, UserRoles } from '#common';
import { FindUserQuery, FindUsersQuery, UserQueryFacade } from '#user/application/queries';

@ApiTags('user')
@Controller('user')
@AuthRoles(UserRoles.ADMIN)
export class UserQueryController {
  public constructor(private readonly userFacade: UserQueryFacade) {}

  @ApiOperation({ summary: 'Admin - Get users' })
  @ApiOkResponse({ type: UserModel, isArray: true })
  @Get()
  public findMany(): Promise<UserModel[]> {
    const query = new FindUsersQuery();
    return this.userFacade.findMany(query);
  }

  @ApiOperation({ summary: 'Admin - Get user by id' })
  @ApiOkResponse({ type: UserModel })
  @Get(':id')
  public findOne(@Param('id', IsObjectIdPipe) id: string): Promise<UserModel> {
    const query = new FindUserQuery({ id });
    return this.userFacade.findOne(query);
  }
}
