//import packages
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

//import modules
import { JsonModule } from 'src/config/json/json.module';
import { LoggerModule } from 'src/common/logger/logger.module';
import { ScheduleModule } from '../../service/schedule/schedule.module';
import { EnvModule } from 'src/config/env/env.module';
//import constants
import { MODULE } from './testBossQueue.constants';
//import dtos
import { QueueConnectionDto } from '../../service/setup/setup.dto';
//import controllers
import { TestBossQueueController } from './testBossQueue.controller';
//import services
import { JsonService } from 'src/config/json/json.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { TestBossQueueService } from './testBossQueue.service';
import { JobQueueModule } from '../jobQueue/jobQueue.module';

const {
    CONNECTION_NAME,    //connection name for ScueduleQueue
    SETUP_ALIAS,        //alias for JsonService,
    ENV_ALIAS,          //alias for ConfigService
    FAIL_USEING_ENV,    //connect by setup.json fail and useing default .env
} = MODULE;

@Module({
    imports: [JsonModule, LoggerModule, ScheduleModule, EnvModule, JobQueueModule],
    providers: [
        {
            provide: CONNECTION_NAME,
            inject: [JsonService, LoggerService, ConfigService],
            useFactory: async (jsonService: JsonService, logger: LoggerService, configService: ConfigService) => {
                try {
                    const rabbitmqConfig: QueueConnectionDto = await jsonService.read(SETUP_ALIAS);
                    const { IP, port, account, password, inputQueueName, outputQueueName } = rabbitmqConfig;
                    const material = {
                        connectionName: CONNECTION_NAME,
                        config: rabbitmqConfig
                    };
                    logger.setContext(CONNECTION_NAME);
                    logger.factoryDebug(material);
                    return ClientProxyFactory.create({
                        transport: Transport.RMQ,
                        options: {
                            urls: [`amqp://${account}:${password}@${IP}:${port}`],
                            queue: inputQueueName,
                            serializer: {
                                serialize: value => value.data
                            },
                            noAck: false,
                            queueOptions: {
                                durable: true
                            }
                        }
                    });
                } catch (err) {
                    logger.errorMessage(FAIL_USEING_ENV);
                    const bossQueueEnv: QueueConnectionDto = configService.get(ENV_ALIAS);
                    const { IP, port, account, password, inputQueueName, outputQueueName } = bossQueueEnv;
                    const material = {
                        connectionName: CONNECTION_NAME,
                        config: bossQueueEnv
                    };
                    logger.factoryDebug(material);
                    return ClientProxyFactory.create({
                        transport: Transport.RMQ,
                        options: {
                            urls: [`amqp://${account}:${password}@${IP}:${port}`],
                            queue: inputQueueName,
                            serializer: {
                                serialize: value => value.data,
                            },
                            noAck: false,
                            queueOptions: {
                                durable: true
                            }
                        }
                    });
                };
            },
        },
        TestBossQueueService
    ],
    controllers: [TestBossQueueController],
    exports: [TestBossQueueService]
})
export class TestBossQueueModule { };