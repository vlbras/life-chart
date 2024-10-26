import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto } from './dto';

import { AuthRoles, UserRoles, ActionResponse } from '#common';
import { CreateUserCommand, DeleteUserCommand, UpdateUserCommand, UserCommandFacade } from '#user/application/commands';

@ApiTags('user')
@Controller('user')
@AuthRoles(UserRoles.ADMIN)
export class UserCommandController {
  public constructor(private readonly userFacade: UserCommandFacade) {}

  @ApiOperation({ summary: 'Admin - Create user' })
  @ApiCreatedResponse({ type: ActionResponse })
  @Post()
  public async create(@Body() data: CreateUserDto): Promise<ActionResponse> {
    const command = new CreateUserCommand(data);
    const user = await this.userFacade.create(command);
    return { id: user.id };
  }

  @ApiOperation({ summary: 'Admin - Update user by id' })
  @ApiOkResponse({ type: ActionResponse })
  @Patch(':id')
  public async updateOne(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<ActionResponse> {
    const command = new UpdateUserCommand({ id, ...data });
    const user = await this.userFacade.updateOne(command);
    return { id: user.id };
  }

  @ApiOperation({ summary: 'Admin - Delete user by id' })
  @ApiOkResponse()
  @Delete(':id')
  public async deleteOne(@Param('id') id: string): Promise<void> {
    const command = new DeleteUserCommand({ id });
    await this.userFacade.deleteOne(command);
  }
}
