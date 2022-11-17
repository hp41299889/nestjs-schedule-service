//import packages
import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

//import constants
import { CONTROLLER } from './monitor.constants';
//import dtos
import { ResendMonitorDto } from './monitor.dto';
//import services
import { MonitorService } from './monitor.service';
import { LoggerService } from 'src/common/logger/logger.service';
const {
    API_TAG,        //
    API_ROUTES,     //
    READ_ROUTES,    //
    RESEND_ROUTES   //
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
    read() {
        try {
            this.logger.controllerDebug(READ_ROUTES);
            return this.monitorService.read();
        } catch (err) {
            this.logger.errorMessage(err);
            return err;
        };
    };

    @Post(RESEND_ROUTES)
    resend(@Body() data: ResendMonitorDto) {
        try {
            this.logger.controllerDebug(RESEND_ROUTES);
            return this.monitorService.resend(data);
        } catch (err) {
            this.logger.errorMessage(err);
            return err;
        };
    };
};