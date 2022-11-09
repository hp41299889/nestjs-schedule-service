import { BadRequestException, Injectable, Logger, Render, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { AdminConfig } from 'src/config/config.interface';
import { LoginAuthDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly configSerivce: ConfigService
    ) { };

    private readonly adminConfig: AdminConfig = this.configSerivce.get('admin');
    private readonly logger = new Logger(AuthService.name);

    async login(data: LoginAuthDto) {
        try {
            this.logger.debug('Logining to ScheduleService');
            const { account, password } = this.adminConfig;
            if (data.account === account) {
                if (data.password === password) {
                    this.logger.debug('Login Success');
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
            this.logger.debug('Logouting to ScheduleService');
            return;
        } catch (err) {
            this.logger.error(err);
            throw new BadRequestException(err);
        };
    };
};