//import packages
import { Injectable, Req, Session } from '@nestjs/common';
import { Request } from 'express';

//import constants
import { SERVICE } from './auth.constants';
//import dtos
import { LoginDto } from './auth.dto';
//import services
import { JsonService } from 'src/config/json/json.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    SETUP_ALIAS,        //alias for JsonService
    LOGIN_METHOD,       //login()
    LOGOUT_METHOD,      //logout()
    LOGIN_FAIL_ACCOUNT, //account error message
    LOGIN_FAIL_PASSWORD,//password error message
} = SERVICE;

@Injectable()
export class AuthService {
    constructor(
        private readonly jsonSerivce: JsonService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(AuthService.name);
    };

    async login(data: LoginDto): Promise<number> {
        try {
            this.logger.serviceDebug(LOGIN_METHOD);
            const adminConfig: LoginDto = await this.jsonSerivce.read(SETUP_ALIAS);
            const { account, password } = adminConfig;
            if (data.account === account) {
                if (data.password === password) {
                    return 301;
                } else {
                    throw LOGIN_FAIL_PASSWORD;
                };
            } else {
                throw LOGIN_FAIL_ACCOUNT;
            };
        } catch (err) {
            throw err;
        };
    };

    async logout(): Promise<void> {
        try {
            this.logger.serviceDebug(LOGOUT_METHOD);
        } catch (err) {
            throw err;
        };
    };
};