//import packages
import { BadRequestException, Injectable, Logger, Render, Res, Req, Session } from '@nestjs/common';
import { Request } from 'express';

//import constants
import { SERVICE } from './auth.constants';
//import dtos
import { LoginDto } from './auth.dto';
//import services
import { JsonService } from 'src/config/json/json.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    SETUP_ALIAS,    //alias for JsonService
    LOGIN_METHOD,   //login()
    LOGOUT_METHOD,  //logout()
} = SERVICE;

@Injectable()
export class AuthService {
    constructor(
        private readonly jsonSerivce: JsonService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(AuthService.name);
    };

    async login(data: LoginDto): Promise<any> {
        try {
            this.logger.serviceDebug(LOGIN_METHOD);
            const adminConfig: LoginDto = await this.jsonSerivce.read(SETUP_ALIAS);
            const { account, password } = adminConfig;
            if (data.account === account) {
                if (data.password === password) {
                    return 301;
                } else {
                    throw 'Lonin fail, password is incorrect';
                };
            } else {
                throw 'Login fail, account is incorrect';
            };
        } catch (err) {
            throw err;
        };
    };

    async logout(@Req() request: Request, @Session() session: Record<string, any>) {
        try {
            this.logger.serviceDebug(LOGOUT_METHOD);
        } catch (err) {
            throw err;
        };
    };
};