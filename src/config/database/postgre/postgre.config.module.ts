import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration]
        })
    ],
    providers: [
        ConfigService,
    ]
})
export class PostgreConfigModule { }