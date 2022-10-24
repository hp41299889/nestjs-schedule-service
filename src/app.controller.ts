import { Controller, Get, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';
import { PerfectCubicSumDto } from './math/cubicSum.dto';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService
    ) { }

    @Post('/cubicsum')
    PostCubicSum(@Body() data: PerfectCubicSumDto) {
        return this.appService.cubicSum(data);
    };
};