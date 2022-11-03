import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('setup')
export class SetupController {
    @Get()
    async read() {

    };

    @Post()
    async postgreConnectTest() {

    };

    @Post()
    async mongoConnectTest() {

    };

    @Patch()
    async save() {

    };
};