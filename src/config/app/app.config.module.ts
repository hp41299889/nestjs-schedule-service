import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app.config.service';

import configuration from './configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration]
        })
    ],
    providers: [
        ConfigService
    ]
})
export class AppConfigModule { }
