import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';

import {
    appConfig,
    mongoConfig,
    postgreConfig,
    rabbitmqConfig,
    adminConfig
} from './configuration';

@Module({
    imports: [
        NestConfigModule.forRoot({
            load: [
                appConfig,
                mongoConfig,
                postgreConfig,
                rabbitmqConfig,
                adminConfig
            ]
        })
    ],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule { }
