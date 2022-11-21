//import packages
import { Controller, Body, Post, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
    query(@Body() data: QueryDto): Promise<ScheduleExecutionLog[]> {
        try {
            this.logger.controllerDebug(QUERY_METHOD);
            data.dateInterval = dateIntervalEnum[data.dateInterval];
            return this.executionLogService.query(data);
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };
};