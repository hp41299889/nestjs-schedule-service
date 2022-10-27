import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AppService } from './app.service';
import { PerfectCubicSumDto } from './math/perfectCubicSum.dto';
import { ChildProcessDto } from './childProcess/childProcess.dto';
import { AddTaskDto, DeleteTaskDto } from './task/task.dto';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService
    ) { };

    private id: number = 0;

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

    @Get('/waittest')
    async waitTest() {
        this.id++;
        return await this.appService.waitTest(this.id);
    };

    @Post('/addcronjob')
    async addCronJob(@Body() data: AddTaskDto) {
        return await this.appService.addCronJob(data);
    };

    @Post('/deletecronjob')
    async deleteCronJob(@Body() data: DeleteTaskDto) {
        return await this.appService.deleteCronJob(data);
    };

    @Get('/cronjobs')
    async getCronJobs() {
        return await this.appService.getCronJobs();
    };
};