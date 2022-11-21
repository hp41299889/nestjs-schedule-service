//import packages
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

//import modules
import { JsonModule } from 'src/config/json/json.module';
import { LoggerModule } from 'src/common/logger/logger.module';
import { ScheduleModule } from '../schedule/schedule.module';
//import constants
import { MODULE } from './scheduleQueue.constants';
//import dtos
import { QueueConnectionDto } from '../setup/setup.dto';
//import controllers
import { ScheduleQueueController } from './scheduleQueue.controller';
//import services
import { JsonService } from 'src/config/json/json.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    CONNECTION_NAME,    //connection name for ScueduleQueue
    SETUP_ALIAS,        //alias for JsonService
} = MODULE;

@Module({
    imports: [JsonModule, LoggerModule, ScheduleModule],
    providers: [
        {
            provide: CONNECTION_NAME,
            inject: [JsonService, LoggerService],
            useFactory: async (jsonService: JsonService, logger: LoggerService) => {
                try {
                    const rabbitmqConfig: QueueConnectionDto = await jsonService.read(SETUP_ALIAS);
                    const { IP, port, account, password, inputQueueName } = rabbitmqConfig;
                    const material = {
                        connectionName: CONNECTION_NAME,
                        config: rabbitmqConfig
                    }
                    logger.setContext(CONNECTION_NAME);
                    logger.factoryDebug(material);
                    return ClientProxyFactory.create({
                        transport: Transport.RMQ,
                        options: {
                            urls: [`amqp://${account}:${password}@${IP}:${port}`],
                            queue: inputQueueName,
                            noAck: false,
                            queueOptions: {
                                durable: true
                            }
                        }
                    })
                } catch (err) {
                    logger.errorMessage(err);
                    return err;
                }
            },
        },
    ],
    controllers: [ScheduleQueueController],
    exports: []
})
export class ScheduleQueueModule { }
