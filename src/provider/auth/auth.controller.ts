import { Controller, Post, Get, Body, Logger, BadRequestException, Req, Res, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import * as CONST from './auth.constants';
import { LoginAuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags(CONST.API_TAGS)
@Controller(CONST.API_ROUTES)
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { };

    private readonly logger = new Logger(AuthController.name);
    private readonly debugMessage = 'Calling AuthService.';

    @Post(CONST.LOGIN)
    async login(@Body() data: LoginAuthDto, @Req() request: Request, @Res() response: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.debug(`${this.debugMessage}login`);
            return await this.authService.login(data).then(res => {
                if (res) {
                    this.logger.debug('Login error', res);
                    response.send(res);
                } else {
                    session.visits = session.visits ? session.visits + 1 : 1;
                    response.redirect('../Schedule/view');
                };
            })
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    @Get(CONST.LOGOUT)
    async logout(@Res() response: Response) {
        try {
            this.logger.debug(`${this.debugMessage}logout`);
            return response.render('Auth');
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };
};