//import packages
import { Controller, Post, Get, Patch, Delete, Body, UseFilters, BadRequestException, Res, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

//import constants
import { CONTROLLER } from './schedule.constants';
//import dtos
import { CreateScheduleDto, DeleteScheduleDto, UpdateScheduleDto } from './schedule.dto';
//import others
import { Exception } from 'src/util/exception/exception';
//import service
import { ScheduleService } from './schedule.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { HttpService } from 'src/common/http/http.service';

const {
    API_TAGS,       //tag for Swagger UI
    API_ROUTES,     //prefix routes for controller
    CREATE_ROUTE,   //create
    READALL_ROUTE,  //readAll
    UPDATE_ROUTE,   //update
    DELETE_ROUTE,   //delete
    REDIRECT_ROUTES,//
} = CONTROLLER;

@ApiTags(API_TAGS)
@Controller(API_ROUTES)
@UseFilters(Exception)
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService,
        private readonly logger: LoggerService,
        private readonly http: HttpService
    ) {
        this.logger.setContext(ScheduleController.name);
    };

    @Post(CREATE_ROUTE)
    @ApiOperation({ summary: `Create a row of Schedule in postgres` })
    async create(@Body() data: CreateScheduleDto, @Res() response: Response, @Session() session: Record<string, any>): Promise<void | Response<any, Record<string, any>>> {
        try {
            this.logger.controllerDebug(CREATE_ROUTE);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                await this.scheduleService.create(data);
                return response.json(this.http.successResponse());
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Get(READALL_ROUTE)
    @ApiOperation({ summary: 'Read all rows of Schedule in postgres' })
    async readAll(@Res() response: Response, @Session() session: Record<string, any>): Promise<void | Response<any, Record<string, any>>> {
        try {
            this.logger.controllerDebug(READALL_ROUTE);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                const schedules = await this.scheduleService.readAll()
                return response.json(schedules);
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Patch(UPDATE_ROUTE)
    @ApiOperation({ summary: 'Update a row of Schedule in postgres by scheduleID' })
    async update(@Body() data: UpdateScheduleDto, @Res() response: Response, @Session() session: Record<string, any>): Promise<void | Response<any, Record<string, any>>> {
        try {
            this.logger.controllerDebug(UPDATE_ROUTE);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                await this.scheduleService.update(data);
                return response.json(this.http.successResponse());
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Delete(DELETE_ROUTE)
    @ApiOperation({ summary: 'Delete a row of Schedule in postgres by scheduleID' })
    async delete(@Body() data: DeleteScheduleDto, @Res() response: Response, @Session() session: Record<string, any>): Promise<void | Response<any, Record<string, any>>> {
        try {
            this.logger.controllerDebug(DELETE_ROUTE);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                await this.scheduleService.delete(data);
                return response.json(this.http.successResponse());
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };
};