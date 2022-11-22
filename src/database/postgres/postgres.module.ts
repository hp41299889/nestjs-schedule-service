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
//import services
import { JsonService } from 'src/config/json/json.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { ConnectionModule } from '../connection/connection.module';
import { ConnectionService } from '../connection/connection.service';

const {
    CONNECTION_NAME,    //
    SETUP_ALIAS,        //
} = MODULE;

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: CONNECTION_NAME,
            imports: [JsonModule, LoggerModule, ConnectionModule],
            inject: [JsonService, LoggerService, ConnectionService],
            useFactory: async (jsonService: JsonService, logger: LoggerService, connectionService: ConnectionService) => {
                const postgresConfig: DatabaseConnectionDto = await jsonService.read(SETUP_ALIAS);
                const material = {
                    connectionName: CONNECTION_NAME,
                    config: postgresConfig
                };
                logger.setContext(CONNECTION_NAME);
                logger.factoryDebug(material);
                const { IP, port, account, password, DBName } = postgresConfig;
                const connectionTest: { results: string } = await connectionService.testPostgresConnection(postgresConfig);
                const { results } = connectionTest;
                if (results === 'Success') {
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
                } else {
                    //TODO use ConfigModule
                    logger.error('Warning!postgres connect by setup.json fail,useing default env');
                    return {
                        type: 'postgres',
                        username: process.env.POSTGRES_ACCOUNT,
                        password: process.env.POSTGRES_PASSWORD,
                        host: process.env.POSTGRES_IP,
                        port: +process.env.POSTGRES_PORT,
                        database: process.env.POSTGRES_DBNAME,
                        autoLoadEntities: true,
                        retryAttempts: 3
                    };
                };
            },
            // dataSourceFactory: async (options) => {
            //     return new DataSource(options)
            //         .initialize()
            //         .catch(err => {
            //             const logger = new LoggerService();
            //             logger.setContext(PostgresModule.name);
            //             logger.error('Warning!postgres connect by setup.json fail,useing default env');

            //             return new DataSource({
            //                 type: 'postgres',
            //                 username: process.env.POSTGRES_ACCOUNT,
            //                 password: process.env.POSTGRES_PASSWORD,
            //                 host: process.env.POSTGRES_IP,
            //                 port: +process.env.POSTGRES_PORT,
            //                 database: process.env.POSTGRES_DBNAME,
            //                 entities: [ScheduleSetup]
            //             })
            //         });
            // }
        }),
        ScheduleSetupModelModule,
    ],
})
export class PostgresModule { }