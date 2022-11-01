import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AddTaskDto, DeleteTaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { };

    @Post()
    @ApiOperation({ tags: ['Schedule'] })
    async addCronJob(@Body() data: AddTaskDto) {
        return await this.taskService.addCronJob(data);
    };

    @Delete()
    @ApiOperation({ tags: ['Schedule'] })
    async deleteCronJob(@Body() data: DeleteTaskDto) {
        return await this.taskService.deleteCron(data);
    };

    @Get()
    @ApiOperation({ tags: ['Schedule'] })
    async getCronJobs() {
        return await this.taskService.getCrons();
    };
};