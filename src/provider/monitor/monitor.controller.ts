//import packages
import { Controller, Post, Get, Body, Res, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

//import constants
import { CONTROLLER } from './monitor.constants';
//import dtos
import { ResendMonitorDto, WeekLogsDto } from './monitor.dto';
//import services
import { MonitorService } from './monitor.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { HttpService } from 'src/common/http/http.service';
const {
    API_TAG,        //tag for Swagger UI
    API_ROUTES,     //prefix routes for controller
    READ_ROUTES,    //read
    RESEND_ROUTES,  //resend
    REDIRECT_ROUTES,//
} = CONTROLLER;

@ApiTags(API_TAG)
@Controller(API_ROUTES)
export class MonitorController {
    constructor(
        private readonly logger: LoggerService,
        private readonly http: HttpService,
        private readonly monitorService: MonitorService
    ) {
        this.logger.setContext(MonitorController.name);
    };

    @Get(READ_ROUTES)
    async read(@Res() response: Response, @Session() session: Record<string, any>): Promise<void | Response<any, Record<string, any>>> {
        try {
            this.logger.controllerDebug(READ_ROUTES);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                const weekLogs = await this.monitorService.read();
                return response.json(weekLogs);
            };
        } catch (err) {
            this.logger.errorMessage(err);
            return err;
        };
    };

    @Post(RESEND_ROUTES)
    resend(@Body() data: ResendMonitorDto, @Res() response: Response, @Session() session: Record<string, any>): void | Response<any, Record<string, any>> {
        try {
            this.logger.controllerDebug(RESEND_ROUTES);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                this.monitorService.resend(data);
                return response.json(this.http.successResponse());
            };
        } catch (err) {
            this.logger.errorMessage(err);
            return err;
        };
    };
};