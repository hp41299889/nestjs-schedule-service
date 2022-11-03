import { Controller, Post, Get, Patch, Delete, Body } from '@nestjs/common';

import { CreateScheduleDto, DeleteScheduleDto, UpdateScheduleDto } from './schedule.dto';

@Controller('Schedule')
export class ScheduleController {
    @Post()
    async create(@Body() createScheduleDto: CreateScheduleDto) {

    };

    @Get()
    async readAll() {
        return;
    };

    @Patch()
    async update(@Body() updateScheduleDto: UpdateScheduleDto) {

    };

    @Delete()
    async delete(@Body() deleteScheduleDto: DeleteScheduleDto) {

    };
};