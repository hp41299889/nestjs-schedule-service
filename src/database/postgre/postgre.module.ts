import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PostgreConfig } from 'src/config/config.interface';
import { ConfigModule } from 'src/config/config.module';
import { ScheduleExecutionLogModule } from 'src/model/scheduleExecutionLog/scheduleExecutionLog.module';
import { ScheduleExecutionLog } from 'src/model/scheduleExecutionLog/scheduleExecutionLog.entity';
import { ProstgreService } from './postgre.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
                const postgreConfig: PostgreConfig = configService.get('postgre');
                const { postgreUsername, postgrePassword, postgreHost, postgrePort, postgreDatabase } = postgreConfig;
                return {
                    type: 'postgres',
                    host: postgreHost,
                    port: postgrePort,
                    username: postgreUsername,
                    password: postgrePassword,
                    database: postgreDatabase,
                    entities: [ScheduleExecutionLog],
                    synchronize: true
                }
            },
            inject: [ConfigService]
        }),
        ScheduleExecutionLogModule
    ],
    // providers: [ProstgreService],
    // exports: [ProstgreService]
})
export class PostgreModule { }