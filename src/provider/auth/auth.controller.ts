import { Controller, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import * as CONST from './auth.constants';

@ApiTags(CONST.API_TAGS)
@Controller(CONST.API_ROUTES)
export class AuthController {
    @Post(CONST.LOGIN)
    login() {

    };

    @Get(CONST.LOGOUT)
    logout() {

    };
};