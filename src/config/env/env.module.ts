import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

import appConfig from './app/app.configuation';

@Module({
    imports: [ConfigModule.forRoot({
        load: [appConfig]
    })],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class EnvModule { };