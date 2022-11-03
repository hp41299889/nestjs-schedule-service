import { Controller, Post, Get } from '@nestjs/common';

@Controller('monitor')
export class MonitorController {
    @Get()
    async read() {

    };

    @Post()
    async resend() {

    };
};