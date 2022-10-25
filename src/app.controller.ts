import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AppService } from './app.service';
import { PerfectCubicSumDto } from './math/perfectCubicSum.dto';
import { ChildProcessDto } from './childProcess/childProcess.dto';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService
    ) { }

    @Post('/perfectcubicsum')
    @ApiOperation({ summary: 'POST a and b as a number to middleservice to calculate perfect cubic sum' })
    async PostPerfectCubicSum(@Body() data: PerfectCubicSumDto) {
        return await this.appService.perfectCubicSum(data);
    };

    @Post('/childprocess')
    @ApiOperation({ summary: 'POST scripts to middleservice to run child process' })
    async PostChildProcess(@Body() data: ChildProcessDto) {
        return await this.appService.childProcess(data);
    };
};