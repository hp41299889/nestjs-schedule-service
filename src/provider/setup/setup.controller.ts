import { Controller, Get, Patch, Post, Body, BadRequestException, UseFilters, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import * as CONST from './setup.constants';
import { MongoConnectTestSetupDto, PostgreConnectTestSetupDto, SaveSetupDto } from './setup.dto';
import { SetupService } from './setup.service';
import { Exception } from 'src/util/exception/exception';

@ApiTags(CONST.API_TAGS)
@Controller(CONST.API_ROUTES)
@UseFilters(Exception)
export class SetupController {
    constructor(
        private readonly setupService: SetupService
    ) { };

    private readonly logger = new Logger(SetupController.name);
    private readonly debugMessage = 'Calling setup.';

    @Get(CONST.READ)
    read() {
        return this.setupService.read();
    };

    @Post(CONST.POSTGRECONNECTTEST)
    postgreConnectTest(@Body() data: PostgreConnectTestSetupDto) {
        return this.setupService.postgreConnectTest(data);
    };

    @Post(CONST.MONGOCONNECTTEST)
    mongoConnectTest(@Body() data: MongoConnectTestSetupDto) {
        return this.setupService.mongoConnectTest(data);
    };

    @Patch(CONST.SAVE)
    save(@Body() data: SaveSetupDto) {
        try {
            this.logger.debug(`${this.debugMessage}save()`);
            return this.setupService.save(data);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        }
    };
};