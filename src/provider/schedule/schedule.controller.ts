import { Controller, Post, Get, Patch, Delete, Body, UseFilters, BadRequestException, Logger } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CONTROLLER } from './schedule.constants';
import { CreateScheduleDto, DeleteScheduleDto, UpdateScheduleDto } from './schedule.dto';
import { Exception } from 'src/util/exception/exception';
import { ScheduleService } from './schedule.service';

const {
    SWAGGER_TAGS,           //
    API_ROUTES,             //
    CREATE_ROUTE,           //
    READALL_ROUTE,          //
    UPDATE_ROUTE,           //
    DELETE_ROUTE,           //
    DEBUG_MESSAGE,          //
    DEBUG_MESSAGE_SUCCESS,  //
} = CONTROLLER;

@ApiTags(SWAGGER_TAGS)
@Controller(API_ROUTES)
@UseFilters(Exception)
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService,
    ) { };

    private readonly logger = new Logger(ScheduleController.name);

    @Post(CREATE_ROUTE)
    @ApiOperation({ summary: `Create a row of Schedule in postgres` })
    async create(@Body() data: CreateScheduleDto) {
        this.logger.debug(`${DEBUG_MESSAGE} ${CREATE_ROUTE}`, data);
        try {
            const res = await this.scheduleService.create(data);
            this.logger.debug(`${CREATE_ROUTE} ${DEBUG_MESSAGE_SUCCESS}`);
            return
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    @Get(READALL_ROUTE)
    @ApiOperation({ summary: 'Read all rows of Schedule in postgres' })
    async readAll() {
        this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${READALL_ROUTE}`);
        try {
            return await this.scheduleService.readAll();
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    @Patch(UPDATE_ROUTE)
    @ApiOperation({ summary: 'Update a row of Schedule in postgres by scheduleID' })
    async update(@Body() data: UpdateScheduleDto) {
        this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${UPDATE_ROUTE}`);
        try {
            return await this.scheduleService.update(data);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    @Delete(DELETE_ROUTE)
    @ApiOperation({ summary: 'Delete a row of Schedule in postgres by scheduleID' })
    async delete(@Body() data: DeleteScheduleDto) {
        this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${DELETE_ROUTE}`);
        try {
            return await this.scheduleService.delete(data);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };
};