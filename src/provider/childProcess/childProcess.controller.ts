import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { ChildProcessDto } from './childProcess.dto';
import { ChildProcessService } from './childprocess.service';

@Controller()
export class ChildProcessController {
    constructor(
        private readonly childProcessService: ChildProcessService
    ) { };

    @Post('/childprocess')
    @ApiOperation({ summary: 'POST scripts to middleservice to run child process' })
    async PostChildProcess(@Body() data: ChildProcessDto) {
        return await this.childProcessService.childProcess(data);
    };
};