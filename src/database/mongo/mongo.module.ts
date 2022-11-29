//import packages
import { Module } from "@nestjs/common";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

//import modules
import { JsonModule } from "src/config/json/json.module";
import { LoggerModule } from "src/common/logger/logger.module";
import { ConnectionModule } from "../connection/connection.module";
//import constants
import { MODULE } from './mongo.constants';
//import dtos
import { DatabaseConnectionDto } from "src/service/setup/setup.dto";
//import services
import { JsonService } from "src/config/json/json.service";
import { LoggerService } from "src/common/logger/logger.service";
import { ConnectionService } from "../connection/connection.service";
import { EnvModule } from "src/config/env/env.module";

const {
    CONNECTION_NAME,    //connection name for MongooseModule
    SETUP_ALIAS,        //alias for JsonService
    ENV_ALIAS,          //alias for ConfigService
    RETRY_ATTEMPTS,     //retry attempts for connection
    FAIL_USEING_ENV,    //connect by setup.json fail and useing default .env
} = MODULE;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            connectionName: CONNECTION_NAME,
            imports: [JsonModule, LoggerModule, ConnectionModule, EnvModule],
            inject: [JsonService, LoggerService, ConnectionService, ConfigService],
            useFactory: async (jsonService: JsonService, logger: LoggerService, connectionService: ConnectionService, configService: ConfigService) => {
                try {
                    const mongoConfig: DatabaseConnectionDto = await jsonService.read(SETUP_ALIAS);
                    const material = {
                        connectionName: CONNECTION_NAME,
                        config: mongoConfig
                    };
                    logger.setContext(CONNECTION_NAME);
                    logger.factoryDebug(material);
                    const { IP, port, account, password, DBName } = mongoConfig;
                    await connectionService.testMongoConnection(mongoConfig);
                    const uri = `mongodb://${account}:${password}@${IP}:${port}/${DBName}`;
                    const options: MongooseModuleOptions = {
                        uri: uri,
                        retryAttempts: RETRY_ATTEMPTS
                    };
                    return options;
                } catch (err) {
                    logger.error(FAIL_USEING_ENV);
                    const mongoEnv: DatabaseConnectionDto = configService.get(ENV_ALIAS);
                    const material = {
                        connectionName: CONNECTION_NAME,
                        config: mongoEnv
                    };
                    logger.factoryDebug(material);
                    const { IP, port, account, password, DBName } = mongoEnv;
                    const uri = `mongodb://${account}:${password}@${IP}:${port}/${DBName}`;
                    const options: MongooseModuleOptions = {
                        uri: uri,
                        retryAttempts: RETRY_ATTEMPTS
                    };
                    return options;
                };
            }
        })
    ]
})
export class MongoModule { }