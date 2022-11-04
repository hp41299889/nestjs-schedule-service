import { Controller, Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateScheduleDto, DeleteScheduleDto, UpdateScheduleDto } from './schedule.dto';
import { ScheduleService } from './schedule.service';
import * as CONST from './schedule.constants';

@ApiTags(CONST.API_TAGS)
@Controller(CONST.API_ROUTES)
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService
    ) { };

    @Post(CONST.CREATE)
    @ApiOperation({ summary: `Send { cmd: ${CONST.CREATE} } message to RMQ` })
    create(@Body() data: CreateScheduleDto) {
        return this.scheduleService.create(data);
    };

    @Get(CONST.READALL)
    @ApiOperation({ summary: `Send { cmd: ${CONST.READALL} } message to RMQ` })
    readAll() {
        return this.scheduleService.readAll();
    };

    @Patch(CONST.UPDATE)
    @ApiOperation({ summary: `Send { cmd: ${CONST.UPDATE} } message to RMQ` })
    update(@Body() data: UpdateScheduleDto) {
        return this.scheduleService.update(data);
    };

    @Delete(CONST.DELETE)
    @ApiOperation({ summary: `Send { cmd: ${CONST.DELETE} } message to RMQ` })
    delete(@Body() data: DeleteScheduleDto) {
        return this.scheduleService.delete(data);
    };
};