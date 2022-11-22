//import packages
import { Module } from "@nestjs/common";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";

//import modules
import { JsonModule } from "src/config/json/json.module";
import { LoggerModule } from "src/common/logger/logger.module";
import { ConnectionModule } from "../connection/connection.module";
//import constants
import { MODULE } from './mongo.constants';
//import dtos
import { DatabaseConnectionDto } from "src/provider/setup/setup.dto";
//import services
import { JsonService } from "src/config/json/json.service";
import { LoggerService } from "src/common/logger/logger.service";
import { ConnectionService } from "../connection/connection.service";

const {
    CONNECTION_NAME,    //connection name for MongooseModule
    SETUP_ALIAS,        //alias for JsonService
} = MODULE;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            connectionName: CONNECTION_NAME,
            imports: [JsonModule, LoggerModule, ConnectionModule],
            inject: [JsonService, LoggerService, ConnectionService],

            useFactory: async (jsonService: JsonService, logger: LoggerService, connectionService: ConnectionService) => {
                const mongoConfig: DatabaseConnectionDto = await jsonService.read(SETUP_ALIAS);
                const material = {
                    connectionName: CONNECTION_NAME,
                    config: mongoConfig
                };
                logger.setContext(CONNECTION_NAME);
                logger.factoryDebug(material);
                const { IP, port, account, password, DBName } = mongoConfig;
                const connectionTest: { results: string } = await connectionService.testMongoConnection(mongoConfig);
                const { results } = connectionTest;
                if (results === 'Success') {
                    const uri = `mongodb://${account}:${password}@${IP}:${port}/${DBName}`;
                    const options: MongooseModuleOptions = {
                        uri: uri,
                        retryAttempts: 3
                    };
                    return options;
                } else {
                    //TODO use ConfigModule
                    logger.error('Warning!mongo connect by setup.json fail,useing default env');
                    const { MONGO_IP, MONGO_PORT, MONGO_ACCOUNT, MONGO_PASSWORD, MONGO_DBNAME } = process.env;
                    const uri = `mongodb://${MONGO_ACCOUNT}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DBNAME}`;
                    const options: MongooseModuleOptions = {
                        uri: uri,
                        retryAttempts: 3
                    };
                    return options;
                };
            }
        })
    ]
})
export class MongoModule { }