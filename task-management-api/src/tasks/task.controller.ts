import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  create(@Body() task: CreateTaskDto) {
    this.taskService.create(task);
  }

  @Get()
  get(@Query() paginationDto: PaginationDto) {
    return this.taskService.getAll(paginationDto);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Put(':id')
  update(@Param(':id') id: string, @Body() task: UpdateTaskDto) {
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  updateTask(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
