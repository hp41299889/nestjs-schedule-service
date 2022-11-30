//import packages
import { Controller, Get, Patch, Post, Body, BadRequestException, UseFilters, Res, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

//import constants
import { CONTROLLER } from './setup.constants';
//import dtos
import { DatabaseConnectionDto, SaveSetupDto } from './setup.dto';
//import others
import { Exception } from 'src/util/exception/exception';
//import services
import { SetupService } from './setup.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { HttpService } from 'src/common/http/http.service';

const {
    API_TAG,                    //tag for Swagger UI
    API_ROUTES,                 //prefix routes for controller
    READ_ROUTES,                //read
    POSTGRESCONNECTTEST_ROUTES, //postgreConnectTest
    MONGOCONNECTTEST_ROUTES,    //mongoConnectTest
    SAVE_ROUTES,                //save
    REDIRECT_ROUTES,
} = CONTROLLER;

@ApiTags(API_TAG)
@Controller(API_ROUTES)
@UseFilters(Exception)
export class SetupController {
    constructor(
        private readonly setupService: SetupService,
        private readonly logger: LoggerService,
        private readonly http: HttpService
    ) {
        this.logger.setContext(SetupController.name);
    };

    @Get(READ_ROUTES)
    async read(@Res() response: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.controllerDebug(READ_ROUTES);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                const setup = await this.setupService.read();
                return response.json(JSON.parse(setup));
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Post(POSTGRESCONNECTTEST_ROUTES)
    async postgreConnectTest(@Body() data: DatabaseConnectionDto, @Res() response: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.controllerDebug(POSTGRESCONNECTTEST_ROUTES);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                await this.setupService.postgreConnectTest(data);
                return response.json(this.http.successResponse());
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Post(MONGOCONNECTTEST_ROUTES)
    async mongoConnectTest(@Body() data: DatabaseConnectionDto, @Res() response: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.controllerDebug(MONGOCONNECTTEST_ROUTES);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                await this.setupService.mongoConnectTest(data);
                return response.json(this.http.successResponse());
            };
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    @Patch(SAVE_ROUTES)
    save(@Body() data: SaveSetupDto, @Res() response: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.controllerDebug(SAVE_ROUTES);
            if (!session.visits) {
                return response.status(401).redirect(REDIRECT_ROUTES);
            } else {
                this.setupService.save(data);
                return response.redirect(REDIRECT_ROUTES);
            };
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };
};