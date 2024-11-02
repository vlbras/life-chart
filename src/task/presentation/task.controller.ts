import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsObjectIdPipe } from 'nestjs-object-id';

import { ChangeTaskStatusDto, CreateTaskDto, GetTasksDto, UpdateTaskDto } from './dto';
import { TaskModel } from './models';

import { ActionResponse, CurrentUserId } from '#common';
import { TaskService } from '#task/application/services/task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  public constructor(public readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Get tasks' })
  @ApiOkResponse({ type: TaskModel, isArray: true })
  @Get()
  public findMany(@CurrentUserId() userId: string, @Query() query: GetTasksDto): Promise<TaskModel[]> {
    return this.taskService.findMany(userId, query);
  }

  @ApiOperation({ summary: 'Get task' })
  @ApiOkResponse({ type: TaskModel })
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<TaskModel> {
    return this.taskService.findOne(id);
  }

  @ApiOperation({ summary: 'Create task' })
  @ApiCreatedResponse({ type: ActionResponse })
  @Post()
  public async create(@CurrentUserId() userId: string, @Body() data: CreateTaskDto): Promise<ActionResponse> {
    return this.taskService.create(userId, data);
  }

  @ApiOperation({ summary: 'Update task' })
  @ApiOkResponse({ type: ActionResponse })
  @Patch(':id')
  public async updateOne(
    @Param('id', IsObjectIdPipe) id: string,
    @Body() data: UpdateTaskDto,
  ): Promise<ActionResponse> {
    return this.taskService.updateOne(id, data);
  }

  @ApiOperation({ summary: 'Delete task' })
  @ApiOkResponse({ type: ActionResponse })
  @Delete(':id')
  public async deleteOne(@Param('id', IsObjectIdPipe) id: string): Promise<ActionResponse> {
    return this.taskService.deleteOne(id);
  }

  @ApiOperation({ summary: 'Change task status' })
  @ApiOkResponse({ type: ActionResponse })
  @Post('change-status/:id')
  public async changeStatus(
    @Param('id', IsObjectIdPipe) id: string,
    @Body() dto: ChangeTaskStatusDto,
  ): Promise<ActionResponse> {
    return this.taskService.changeStatus(id, dto);
  }
}
