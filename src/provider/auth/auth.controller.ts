//import packages
import { Controller, Post, Get, Body, Logger, BadRequestException, Req, Res, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

//import constants
import { CONTROLLER } from './auth.constants';
//import dtos
import { LoginAuthDto } from './auth.dto';
//import services
import { AuthService } from './auth.service';

const {
    API_TAG,                //
    API_ROUTES,             //
    LOGIN_ROUTES,           //
    LOGOUT_ROUTES,          //
    DEBUG_MESSAGE,          //
    DEBUG_MESSAGE_SUCCESS,  //
} = CONTROLLER;

@ApiTags(API_TAG)
@Controller(API_ROUTES)
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { };

    private readonly logger = new Logger(AuthController.name);

    @Post(LOGIN_ROUTES)
    async login(@Body() data: LoginAuthDto, @Req() request: Request, @Res() response: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.debug(`${DEBUG_MESSAGE} ${LOGIN_ROUTES}`);
            const res = await this.authService.login(data);
            if (res) {
                this.logger.debug('Login error', res);
                response.send(res);
            } else {
                this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${LOGIN_ROUTES}`);
                session.visits = session.visits ? session.visits + 1 : 1;
                response.redirect('../Schedule/view');
            };
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    @Get(LOGOUT_ROUTES)
    async logout(@Res() response: Response) {
        try {
            this.logger.debug(`${DEBUG_MESSAGE} ${LOGOUT_ROUTES}`);
            response.redirect('../Auth/view');
            this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${LOGOUT_ROUTES}`)
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };
};