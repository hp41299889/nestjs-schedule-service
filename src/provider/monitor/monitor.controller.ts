import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MonitorService } from './monitor.service';
import { ResendMonitorDto } from './monitor.dto';
import * as CONST from './monitor.constants';

@ApiTags(CONST.API_TAGS)
@Controller(CONST.API_ROUTES)
export class MonitorController {
    constructor(
        private readonly monitorService: MonitorService
    ) { };

    @Get(CONST.READ)
    read() {
        return this.monitorService.read();
    };

    @Post(CONST.RESEND)
    resend(@Body() data: ResendMonitorDto) {
        return this.monitorService.resend(data);
    };
};