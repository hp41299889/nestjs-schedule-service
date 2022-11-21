//import packages
import { Controller, Get, Patch, Post, Body, BadRequestException, UseFilters, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

//import constants
import { CONTROLLER } from './setup.constants';
//import dtos
import { DatabaseConnectionDto, SaveSetupDto } from './setup.dto';
//import others
import { Exception } from 'src/util/exception/exception';
//import services
import { SetupService } from './setup.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    API_TAG,                    //tag for Swagger UI
    API_ROUTES,                 //prefix routes for controller
    READ_ROUTES,                //read
    POSTGRESCONNECTTEST_ROUTES, //postgreConnectTest
    MONGOCONNECTTEST_ROUTES,    //mongoConnectTest
    SAVE_ROUTES,                //save
} = CONTROLLER;

@ApiTags(API_TAG)
@Controller(API_ROUTES)
@UseFilters(Exception)
export class SetupController {
    constructor(
        private readonly setupService: SetupService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(SetupController.name);
    };

    @Get(READ_ROUTES)
    read(): Promise<string> {
        try {
            this.logger.controllerDebug(READ_ROUTES);
            return this.setupService.read();
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Post(POSTGRESCONNECTTEST_ROUTES)
    async postgreConnectTest(@Body() data: DatabaseConnectionDto): Promise<object> {
        try {
            this.logger.controllerDebug(POSTGRESCONNECTTEST_ROUTES);
            return await this.setupService.postgreConnectTest(data);
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Post(MONGOCONNECTTEST_ROUTES)
    mongoConnectTest(@Body() data: DatabaseConnectionDto): Promise<object> {
        try {
            this.logger.controllerDebug(MONGOCONNECTTEST_ROUTES);
            return this.setupService.mongoConnectTest(data);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    @Patch(SAVE_ROUTES)
    save(@Body() data: SaveSetupDto): Promise<string> {
        try {
            this.logger.controllerDebug(SAVE_ROUTES);
            return this.setupService.save(data);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };
};