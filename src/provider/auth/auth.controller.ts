import { Controller, Post, Get, Body, Logger, BadRequestException, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

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
    async login(@Body() data: LoginAuthDto, @Res() response: Response) {
        try {
            this.logger.debug(`${this.debugMessage}login`);
            // return response.send('');
            return await this.authService.login(data).then(res => {
                if (res) {
                    this.logger.debug('Login error', res);
                    response.send(res);
                } else {
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