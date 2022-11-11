import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ConfigModule } from 'src/config/config.module';
import { Schedule } from 'src/model/postgre/schedule/schedule.entity';
import { ScheduleModelModule } from 'src/model/postgre/schedule/schedule.module';
import { JsonService } from 'src/config/json/json.service';
import { PostgreSQLConfigDto } from 'src/config/json/json.dto';
import { ScheduleExecutionLogModule } from 'src/model/postgre/scheduleExecutionLog/scheduleExecutionLog.module';
import { ScheduleExecutionLog } from 'src/model/postgre/scheduleExecutionLog/scheduleExecutionLog.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: 'postgresConnection',
            imports: [ConfigModule],
            inject: [JsonService],
            useFactory: async (jsonService: JsonService) => {
                const postgresConfig: PostgreSQLConfigDto = jsonService.read('postgreSQL');
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