import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from 'src/config/config.module';
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
import { PostgreSQLConfigDto } from 'src/config/json/json.dto';
import { ScheduleSetup } from 'src/model/postgre/scheduleSetup/scheduleSetup.entity';
import { JsonService } from 'src/config/json/json.service';

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
                    entities: [ScheduleSetup],
                    synchronize: true
                }
            },
            dataSourceFactory: async (options) => {
                const datasource = new DataSource(options).initialize();
                return datasource;
            }
        }),
        ScheduleSetupModelModule,
    ],
})
export class PostgresModule { }