//import packages
import { Controller, Post, Get, Patch, Delete, Body, UseFilters, BadRequestException, Logger } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

//import constants
import { CONTROLLER } from './schedule.constants';
//import dtos
import { CreateScheduleDto, DeleteScheduleDto, UpdateScheduleDto } from './schedule.dto';
//import others
import { Exception } from 'src/util/exception/exception';
//import service
import { ScheduleService } from './schedule.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    API_TAGS,       //Tags on swagger
    API_ROUTES,     //controller routes
    CREATE_ROUTE,   //method create routes
    READALL_ROUTE,  //method readAll routes
    UPDATE_ROUTE,   //method update routes
    DELETE_ROUTE,   //method delete routes
} = CONTROLLER;

@ApiTags(API_TAGS)
@Controller(API_ROUTES)
@UseFilters(Exception)
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(ScheduleController.name);
    };

    @Post(CREATE_ROUTE)
    @ApiOperation({ summary: `Create a row of Schedule in postgres` })
    async create(@Body() data: CreateScheduleDto) {
        try {
            this.logger.controllerDebug(CREATE_ROUTE);
            return await this.scheduleService.create(data);
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Get(READALL_ROUTE)
    @ApiOperation({ summary: 'Read all rows of Schedule in postgres' })
    async readAll() {
        try {
            this.logger.controllerDebug(READALL_ROUTE);
            return await this.scheduleService.readAll();
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Patch(UPDATE_ROUTE)
    @ApiOperation({ summary: 'Update a row of Schedule in postgres by scheduleID' })
    async update(@Body() data: UpdateScheduleDto) {
        try {
            this.logger.controllerDebug(UPDATE_ROUTE);
            return await this.scheduleService.update(data);
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Delete(DELETE_ROUTE)
    @ApiOperation({ summary: 'Delete a row of Schedule in postgres by scheduleID' })
    async delete(@Body() data: DeleteScheduleDto) {
        try {
            this.logger.controllerDebug(DELETE_ROUTE);
            return await this.scheduleService.delete(data);
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };
};