//import packages
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

//import modules
import { JsonModule } from 'src/config/json/json.module';
import { LoggerModule } from 'src/common/logger/logger.module';
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
//import constants
import { MODULE } from './postgres.constants';
//import dtos
import { DatabaseConnectionDto } from 'src/provider/setup/setup.dto';
//import entities
import { ScheduleSetup } from 'src/model/postgre/scheduleSetup/scheduleSetup.entity';
//import services
import { JsonService } from 'src/config/json/json.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    CONNECTION_NAME,    //
    SETUP_ALIAS,        //
} = MODULE;

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: CONNECTION_NAME,
            imports: [JsonModule, LoggerModule],
            inject: [JsonService, LoggerService],
            useFactory: async (jsonService: JsonService, logger: LoggerService) => {
                const postgresConfig: DatabaseConnectionDto = await jsonService.read(SETUP_ALIAS);
                const material = {
                    connectionName: CONNECTION_NAME,
                    config: postgresConfig
                };
                logger.setContext(CONNECTION_NAME);
                logger.factoryDebug(material);
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