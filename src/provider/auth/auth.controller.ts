//import packages
import { Controller, Post, Get, Body, Logger, BadRequestException, Req, Res, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

//import constants
import { CONTROLLER } from './auth.constants';
//import dtos
import { LoginDto } from './auth.dto';
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
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(AuthController.name);
    };

    @Post(LOGIN_ROUTES)
    async login(@Body() data: LoginDto, @Req() request: Request, @Res() response: Response, @Session() session: Record<string, any>): Promise<void> {
        try {
            this.logger.controllerDebug(LOGIN_METHOD);
            const res = await this.authService.login(data);
            if (res) {
                response.send(res);
            } else {
                session.visits = session.visits ? session.visits + 1 : 1;
                response.redirect('../Schedule/view');
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Get(LOGOUT_ROUTES)
    async logout(@Res() response: Response): Promise<void> {
        try {
            this.logger.controllerDebug(LOGOUT_METHOD);
            response.redirect('../Auth/view');
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };
};