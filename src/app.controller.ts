import { Controller, Get, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';
import { PerfectCubicSumDto } from './math/perfectCubicSum.dto';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService
    ) { }

    @Post('/perfectcubicsum')
    async PostPerfectCubicSum(@Body() data: PerfectCubicSumDto) {
        return await this.appService.perfectCubicSum(data);
    };
};