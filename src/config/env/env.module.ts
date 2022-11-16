//import packages
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

//import others
import appConfig from './app/app.configuation';

@Module({
    imports: [ConfigModule.forRoot({
        load: [appConfig]
    })],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class EnvModule { };