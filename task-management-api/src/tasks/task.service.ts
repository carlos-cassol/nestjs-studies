import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(task: CreateTaskDto) {
    const newTask = await this.prisma.task.create({
      data: {
        name: task.name,
        description: task.description,
        completed: false,
      },
    });

    return newTask;
  }

  async getAll(paginationDto?: PaginationDto) {
    return await this.prisma.task.findMany({
      take: paginationDto?.limit,
      skip: paginationDto?.offset,
    });
  }

  async findById(taskId: string) {
    const foundTask = await this.prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });
    if (foundTask != null) return foundTask;

    throw new HttpException(
      `Task whith id ${taskId} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  async update(taskId: string, UpdateTaskDto: UpdateTaskDto) {
    const foundTask = await this.prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });

    if (!foundTask) {
      throw new HttpException(
        `Task whith id ${taskId} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const task = this.prisma.task.update({
      where: {
        id: foundTask.id,
      },
      data: UpdateTaskDto,
    });

    return task;
  }

  async delete(taskId: string) {
    const foundTask = await this.prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });

    if (!foundTask) {
      throw new HttpException(
        `Task whith id ${taskId} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const deleteResult = this.prisma.task.delete({
      where: { id: taskId },
    });

    return deleteResult;
  }
}
