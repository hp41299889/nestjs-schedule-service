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
import { DatabaseConnectionDto } from 'src/service/setup/setup.dto';
//import models
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
//import services
import { JsonService } from 'src/config/json/json.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { ConnectionService } from '../connection/connection.service';

const {
    CONNECTION_NAME,    //connection name for TypeOrmModule
    SETUP_ALIAS,        //alias for JsonSerivce,
    ENV_ALIAS,          //alias for ConfigService
    RETRY_ATTEMPTS,     //retry attempts for connection
    FAIL_USEING_ENV,    //connect by setup.json fail and useing default .env
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
                        retryAttempts: RETRY_ATTEMPTS,
                        // synchronize: true,
                    };
                } catch (err) {
                    logger.errorMessage(FAIL_USEING_ENV);
                    const postgresEnv: DatabaseConnectionDto = configService.get(ENV_ALIAS);
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
                        retryAttempts: RETRY_ATTEMPTS
                    };
                };
            },
        }),
        ScheduleSetupModelModule,
    ],
})
export class PostgresModule { }