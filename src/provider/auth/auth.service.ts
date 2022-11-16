//import packages
import { BadRequestException, Injectable, Logger, Render, Res } from '@nestjs/common';

//import constants
import { SERVICE } from './auth.constants';
//import dtos
import { LoginAuthDto } from './auth.dto';
import { AdminConfigDto } from 'src/config/json/json.dto';
//import services
import { JsonService } from 'src/config/json/json.service';

const {
    SETUP_ALIAS,            //
    DEBUG_MESSAGE,          //
    DEBUG_MESSAGE_SUCCESS,  //
    LOGIN_FUNCTION,         //
    LOGOUT_FUNCTION,        //
} = SERVICE;

@Injectable()
export class AuthService {
    constructor(
        private readonly jsonSerivce: JsonService
    ) { };

    private readonly adminConfig: AdminConfigDto = this.jsonSerivce.read(SETUP_ALIAS);
    private readonly logger = new Logger(AuthService.name);

    async login(data: LoginAuthDto) {
        try {
            this.logger.debug(`${DEBUG_MESSAGE} ${LOGIN_FUNCTION}`);
            const { account, password } = this.adminConfig;
            if (data.account === account) {
                if (data.password === password) {
                    this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${LOGIN_FUNCTION}`);
                    return;
                } else {
                    return { error: 'Lonin fail, password is incorrect' };
                };
            } else {
                return { error: 'Login fail, account is incorrect' };
            };
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };

    async logout() {
        try {
            this.logger.debug(`${DEBUG_MESSAGE} ${LOGOUT_FUNCTION}`);
            return this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${LOGOUT_FUNCTION}`);
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };
};