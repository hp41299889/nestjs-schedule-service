//import packages
import { Controller, Post, Get, Body, BadRequestException, Res, Session, Req, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

//import constants
import { CONTROLLER } from './auth.constants';
//import dtos
import { LoginDto } from './auth.dto';
//import utils
import { Exception } from 'src/util/exception/exception';
//import services
import { AuthService } from './auth.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    API_TAG,        //tag for Swagger UI
    API_ROUTES,     //prefix routes for controller
    LOGIN_ROUTES,   //login
    LOGOUT_ROUTES,  //logout
    LOGIN_METHOD,   //login()
    LOGOUT_METHOD,  //logout()
} = CONTROLLER;

@ApiTags(API_TAG)
@Controller(API_ROUTES)
@UseFilters(Exception)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(AuthController.name);
    };

    @Post(LOGIN_ROUTES)
    async login(@Body() data: LoginDto, @Res() response: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.controllerDebug(LOGIN_METHOD);
            const res = await this.authService.login(data);
            if (res === 301) {
                session.visits = session.visits ? session.visits + 1 : 1;
                return response.status(301).redirect('../Schedule/view');
            } else {
                return response.send('bad');
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Get(LOGOUT_ROUTES)
    async logout(@Req() request: Request, @Res() response: Response, @Session() session: Record<string, any>): Promise<void> {
        try {
            this.logger.controllerDebug(LOGOUT_METHOD);
            //TODO
            request.session.destroy(() => {
                response.redirect('../Auth/view');
            });
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };
};