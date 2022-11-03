import { Controller, Post } from '@nestjs/common';

@Controller('execution-log')
export class ExecutionLogController {
    @Post()
    async query() {

    };
};