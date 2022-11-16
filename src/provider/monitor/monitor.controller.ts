//import packages
import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

//import constants
import { CONTROLLER } from './monitor.constants';
//import dtos
import { ResendMonitorDto } from './monitor.dto';
//import services
import { MonitorService } from './monitor.service';

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
        private readonly monitorService: MonitorService
    ) { };

    @Get(READ_ROUTES)
    read() {
        return this.monitorService.read();
    };

    @Post(RESEND_ROUTES)
    resend(@Body() data: ResendMonitorDto) {
        return this.monitorService.resend(data);
    };
};