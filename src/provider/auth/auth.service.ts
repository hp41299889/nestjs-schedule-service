//import packages
import { BadRequestException, Injectable, Logger, Render, Res } from '@nestjs/common';

//import constants
import { SERVICE } from './auth.constants';
//import dtos
import { LoginDto } from './auth.dto';
//import services
import { JsonService } from 'src/config/json/json.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    SETUP_ALIAS,    //
    LOGIN_METHOD,   //
    LOGOUT_METHOD,  //
} = SERVICE;

@Injectable()
export class AuthService {
    constructor(
        private readonly jsonSerivce: JsonService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(AuthService.name);
    };

    async login(data: LoginDto) {
        try {
            this.logger.serviceDebug(LOGIN_METHOD);
            const adminConfig: LoginDto = await this.jsonSerivce.read(SETUP_ALIAS);
            const { account, password } = adminConfig;
            if (data.account === account) {
                if (data.password === password) {
                    return;
                } else {
                    return { error: 'Lonin fail, password is incorrect' };
                };
            } else {
                return { error: 'Login fail, account is incorrect' };
            };
        } catch (err) {
            throw err;
        };
    };

    async logout() {
        try {
            this.logger.serviceDebug(LOGOUT_METHOD);
            return;
        } catch (err) {
            throw err;
        };
    };
};