//import packages
import { Controller, Get, Patch, Post, Body, BadRequestException, UseFilters, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

//import constants
import { CONTROLLER } from './setup.constants';
//import dtos
import { MongoConnectTestSetupDto, PostgreConnectTestSetupDto, SaveSetupDto } from './setup.dto';
//import others
import { Exception } from 'src/util/exception/exception';
//import services
import { SetupService } from './setup.service';

const {
    API_TAG,                    //
    API_ROUTES,                 //
    READ_ROUTES,                //
    POSTGRESCONNECTTEST_ROUTES, //
    MONGOCONNECTTEST_ROUTES,    //
    SAVE_ROUTES,                //
    DEBUG_MESSAGE,              //
    DEBUG_MESSAGE_SUCCESS,      //
} = CONTROLLER;

@ApiTags(API_TAG)
@Controller(API_ROUTES)
@UseFilters(Exception)
export class SetupController {
    constructor(
        private readonly setupService: SetupService
    ) { };

    private readonly logger = new Logger(SetupController.name);

    @Get(READ_ROUTES)
    read() {
        this.logger.debug(`${DEBUG_MESSAGE} ${READ_ROUTES}`)
        return this.setupService.read();
    };

    @Post(POSTGRESCONNECTTEST_ROUTES)
    postgreConnectTest(@Body() data: PostgreConnectTestSetupDto) {
        this.logger.debug(`${DEBUG_MESSAGE} ${POSTGRESCONNECTTEST_ROUTES}`);
        try {
            return this.setupService.postgreConnectTest(data);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    @Post(MONGOCONNECTTEST_ROUTES)
    mongoConnectTest(@Body() data: MongoConnectTestSetupDto) {
        this.logger.debug(`${DEBUG_MESSAGE} ${MONGOCONNECTTEST_ROUTES}`);
        try {
            return this.setupService.mongoConnectTest(data);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    @Patch(SAVE_ROUTES)
    save(@Body() data: SaveSetupDto) {
        this.logger.debug(`${DEBUG_MESSAGE} ${SAVE_ROUTES}`);
        try {
            return this.setupService.save(data);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        }
    };
};