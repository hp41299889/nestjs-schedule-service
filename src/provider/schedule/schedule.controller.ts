import { Controller, Post, Get, Patch, Delete, Body, UseFilters, BadRequestException, Logger } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateScheduleDto, DeleteScheduleDto, UpdateScheduleDto } from './schedule.dto';
import { ScheduleService } from './schedule.service';
import * as CONST from './schedule.constants';
import { Exception } from 'src/util/exception/exception';

@ApiTags(CONST.API_TAGS)
@Controller(CONST.API_ROUTES)
@UseFilters(Exception)
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService,
    ) { };

    private readonly logger = new Logger(ScheduleController.name);
    private readonly debugMessage = 'Calling scheduleService.';

    @Post(CONST.CREATE)
    @ApiOperation({ summary: `Create a row of Schedule in postgres` })
    async create(@Body() data: CreateScheduleDto) {
        try {
            this.logger.debug(`${this.debugMessage}create()`, data);
            await this.scheduleService.create(data);
            return { results: 'Success' };
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    @Get(CONST.READALL)
    @ApiOperation({ summary: 'Read all rows of Schedule in postgres' })
    async readAll() {
        try {
            this.logger.debug(`${this.debugMessage}readAll()`);
            return await this.scheduleService.readAll();
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    @Patch(CONST.UPDATE)
    @ApiOperation({ summary: 'Update a row of Schedule in postgres by scheduleID' })
    async update(@Body() data: UpdateScheduleDto) {
        try {
            this.logger.debug(`${this.debugMessage}update()`);
            await this.scheduleService.update(data);
            return { results: 'Success' };
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    @Delete(CONST.DELETE)
    @ApiOperation({ summary: 'Delete a row of Schedule in postgres  by scheduleID' })
    async delete(@Body() data: DeleteScheduleDto) {
        try {
            this.logger.debug(`${this.debugMessage}delete()`);
            await this.scheduleService.delete(data);
            return { results: 'Success' };
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };
};