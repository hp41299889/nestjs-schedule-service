//import packages
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

//import modules
import { ConfigModule } from 'src/config/config.module';
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
//import constants
import { MODULE } from './postgres.constants';
//import dtos
import { PostgreSQLConfigDto } from 'src/config/json/json.dto';
//import entities
import { ScheduleSetup } from 'src/model/postgre/scheduleSetup/scheduleSetup.entity';
//import services
import { JsonService } from 'src/config/json/json.service';

const {
    CONNECTION_NAME,    //
    SETUP_ALIAS,          //
} = MODULE;

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: CONNECTION_NAME,
            imports: [ConfigModule],
            inject: [JsonService],
            useFactory: async (jsonService: JsonService) => {
                const postgresConfig: PostgreSQLConfigDto = jsonService.read(SETUP_ALIAS);
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