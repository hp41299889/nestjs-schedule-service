//import packages
import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

//import constants
import { CONTROLLER } from './monitor.constants';
//import dtos
import { ResendMonitorDto, WeekLogsDto } from './monitor.dto';
//import services
import { MonitorService } from './monitor.service';
import { LoggerService } from 'src/common/logger/logger.service';
const {
    API_TAG,        //tag for Swagger UI
    API_ROUTES,     //prefix routes for controller
    READ_ROUTES,    //read
    RESEND_ROUTES   //resend
} = CONTROLLER;

@ApiTags(API_TAG)
@Controller(API_ROUTES)
export class MonitorController {
    constructor(
        private readonly logger: LoggerService,
        private readonly monitorService: MonitorService
    ) {
        this.logger.setContext(MonitorController.name);
    };

    @Get(READ_ROUTES)
    read(): Promise<WeekLogsDto[]> {
        try {
            this.logger.controllerDebug(READ_ROUTES);
            return this.monitorService.read();
        } catch (err) {
            this.logger.errorMessage(err);
            return err;
        };
    };

    @Post(RESEND_ROUTES)
    resend(@Body() data: ResendMonitorDto): object {
        try {
            this.logger.controllerDebug(RESEND_ROUTES);
            this.monitorService.resend(data);
            return { results: 'Success' };
        } catch (err) {
            this.logger.errorMessage(err);
            return err;
        };
    };
};