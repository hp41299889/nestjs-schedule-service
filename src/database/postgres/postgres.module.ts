//import packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

//import modules
import { JsonModule } from 'src/config/json/json.module';
import { LoggerModule } from 'src/common/logger/logger.module';
import { ConnectionModule } from '../connection/connection.module';
import { EnvModule } from 'src/config/env/env.module';
//import constants
import { MODULE } from './postgres.constants';
//import dtos
import { DatabaseConnectionDto } from 'src/provider/setup/setup.dto';
//import models
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
//import services
import { JsonService } from 'src/config/json/json.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { ConnectionService } from '../connection/connection.service';

const {
    CONNECTION_NAME,    //connection name for TypeOrmModule
    SETUP_ALIAS,        //alias for JsonSerivce
} = MODULE;

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: CONNECTION_NAME,
            imports: [JsonModule, LoggerModule, ConnectionModule, EnvModule],
            inject: [JsonService, LoggerService, ConnectionService, ConfigService],
            useFactory: async (jsonService: JsonService, logger: LoggerService, connectionService: ConnectionService, configService: ConfigService) => {
                try {
                    const postgresConfig: DatabaseConnectionDto = await jsonService.read(SETUP_ALIAS);
                    const material = {
                        connectionName: CONNECTION_NAME,
                        config: postgresConfig
                    };
                    logger.setContext(CONNECTION_NAME);
                    logger.factoryDebug(material);
                    const { IP, port, account, password, DBName } = postgresConfig;
                    await connectionService.testPostgresConnection(postgresConfig);
                    return {
                        type: 'postgres',
                        username: account,
                        password: password,
                        host: IP,
                        port: +port,
                        database: DBName,
                        autoLoadEntities: true,
                        retryAttempts: 3,
                        // synchronize: true,
                    };
                } catch (err) {
                    logger.error('Warning!postgres connect by setup.json fail,useing default env');
                    const postgresEnv: DatabaseConnectionDto = configService.get('postgres');
                    const material = {
                        connectionName: CONNECTION_NAME,
                        config: postgresEnv
                    };
                    logger.factoryDebug(material);
                    const { IP, port, account, password, DBName } = postgresEnv;
                    return {
                        type: 'postgres',
                        username: account,
                        password: password,
                        host: IP,
                        port: +port,
                        database: DBName,
                        autoLoadEntities: true,
                        retryAttempts: 3
                    };
                };
            },
        }),
        ScheduleSetupModelModule,
    ],
})
export class PostgresModule { }