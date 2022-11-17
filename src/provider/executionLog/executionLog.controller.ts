//import packages
import { Controller, Body, Post, BadRequestException } from '@nestjs/common';

//import constants
import { CONTROLLER } from './executionLog.constants';
//import dtos
import { QueryDto, dateIntervalEnum } from './executionLog.dto';
//import services
import { ExecutionLogService } from './executionLog.service';
import { ControllerLogger } from 'src/common/logger/controllerLogger.service';

const {
    QUERY_METHOD,   //
} = CONTROLLER;

@Controller()
export class ExecutionLogController {
    constructor(
        private readonly executionLogService: ExecutionLogService,
        private readonly logger: ControllerLogger
    ) {
        this.logger.setContext(ExecutionLogController.name);
    };

    @Post()
    query(@Body() data: QueryDto) {
        try {
            this.logger.debugMessage(QUERY_METHOD);
            data.dateInterval = dateIntervalEnum[data.dateInterval];
            return this.executionLogService.query(data);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };
};