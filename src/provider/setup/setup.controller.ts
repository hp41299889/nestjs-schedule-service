import { Controller, Get, Patch, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import * as CONST from './setup.constants';
import { MongoConnectTestSetupDto, PostgreConnectTestSetupDto, SaveSetupDto } from './setup.dto';
import { SetupService } from './setup.service';

@ApiTags(CONST.API_TAGS)
@Controller(CONST.API_ROUTES)
export class SetupController {
    constructor(
        private readonly setupService: SetupService
    ) { };

    @Get(CONST.READ)
    read() {
        return this.setupService.read();
    };

    @Post(CONST.POSTGRECONNECTTEST)
    postgreConnectTest(data: PostgreConnectTestSetupDto) {
        return this.setupService.postgreConnectTest(data);
    };

    @Post(CONST.MONGOCONNECTTEST)
    mongoConnectTest(data: MongoConnectTestSetupDto) {
        return this.setupService.mongoConnectTest(data);
    };

    @Patch(CONST.SAVE)
    save(data: SaveSetupDto) {
        return this.setupService.save();
    };
};