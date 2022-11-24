//import packages
import { Controller, Body, Post, BadRequestException, Res, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

//import constants
import { CONTROLLER } from './executionLog.constants';
//import dtos
import { QueryDto, dateIntervalEnum } from './executionLog.dto';
//import models
import { ScheduleExecutionLog } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.schema';
//import services
import { ExecutionLogService } from './executionLog.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    API_TAGS,       //tag for Swagger UI
    API_ROUTES,     //prefix routes for controller
    QUERY_ROUTES,   //query
    QUERY_METHOD,   //query()
    REDIRECT_ROUTES,//
} = CONTROLLER;

@ApiTags(API_TAGS)
@Controller(API_ROUTES)
export class ExecutionLogController {
    constructor(
        private readonly executionLogService: ExecutionLogService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(ExecutionLogController.name);
    };

    @Post(QUERY_ROUTES)
    async query(@Body() data: QueryDto, @Res() response: Response, @Session() session: Record<string, any>): Promise<void | Response<any, Record<string, any>>> {
        try {
            this.logger.controllerDebug(QUERY_METHOD);
            // if(session.visits)
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                data.dateInterval = dateIntervalEnum[data.dateInterval];
                const executionLogs = await this.executionLogService.query(data);
                return response.json(executionLogs);
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };
};