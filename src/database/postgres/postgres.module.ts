import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { PostgresConfig } from 'src/config/config.interface';
import { ConfigModule } from 'src/config/config.module';
import { Schedule } from 'src/model/postgre/schedule/schedule.entity';
import { ScheduleModelModule } from 'src/model/postgre/schedule/schedule.module';
import { ScheduleExecutionLogModule } from 'src/model/postgre/scheduleExecutionLog/scheduleExecutionLog.module';
import { ScheduleExecutionLog } from 'src/model/postgre/scheduleExecutionLog/scheduleExecutionLog.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: 'postgresConnection',
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const postgresConfig: PostgresConfig = configService.get('postgreSQL');
                const { IP, port, account, password, DBName } = postgresConfig;
                return {
                    type: 'postgres',
                    username: account,
                    password: password,
                    host: IP,
                    port: +port,
                    database: DBName,
                    entities: [Schedule],
                    synchronize: true
                }
            },
            dataSourceFactory: async (options) => {
                const datasource = new DataSource(options).initialize();
                return datasource;
            }
        }),
        ScheduleModelModule,
    ],
})
export class PostgresModule { }