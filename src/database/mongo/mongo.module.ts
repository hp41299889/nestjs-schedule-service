//import packages
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

//import modules
import { JsonModule } from "src/config/json/json.module";
import { LoggerModule } from "src/common/logger/logger.module";
//import constants
import { MODULE } from './mongo.constants';
//import dtos
import { DatabaseConnectionDto } from "src/provider/setup/setup.dto";
//import services
import { JsonService } from "src/config/json/json.service";
import { LoggerService } from "src/common/logger/logger.service";

const {
    CONNECTION_NAME,    //connection name for MongooseModule
    SETUP_ALIAS,        //alias for JsonService
} = MODULE;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            connectionName: CONNECTION_NAME,
            imports: [JsonModule, LoggerModule],
            inject: [JsonService, LoggerService],
            useFactory: async (jsonService: JsonService, logger: LoggerService) => {
                const mongoConfig: DatabaseConnectionDto = await jsonService.read(SETUP_ALIAS);
                const material = {
                    connectionName: CONNECTION_NAME,
                    config: mongoConfig
                };
                logger.setContext(CONNECTION_NAME);
                logger.factoryDebug(material);
                const { IP, port, account, password, DBName } = mongoConfig;
                const uri = `mongodb://${account}:${password}@${IP}:${port}/${DBName}`;
                return { uri };
            }
        })
    ]
})
export class MongoModule { }