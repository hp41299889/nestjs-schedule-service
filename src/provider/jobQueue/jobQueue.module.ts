//import packages
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

//import modules
import { JsonModule } from 'src/config/json/json.module';
import { LoggerModule } from 'src/common/logger/logger.module';
//import constants
import { MODULE } from './jobQueue.constants';
//import dtos
import { QueueConnectionDto } from '../setup/setup.dto';
//import services
import { JobQueueService } from './jobQueue.service';
import { JsonService } from 'src/config/json/json.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
  CONNECTION_NAME,  //connection name for JobQueue
  SETUP_ALIAS,      //alias for JsonService
} = MODULE;

@Module({
  imports: [JsonModule, LoggerModule],
  providers: [
    {
      provide: CONNECTION_NAME,
      inject: [JsonService, LoggerService],
      useFactory: async (jsonService: JsonService, logger: LoggerService) => {
        try {
          const rabbitmqConfig: QueueConnectionDto = await jsonService.read(SETUP_ALIAS);
          const { IP, port, account, password, outputQueueName } = rabbitmqConfig;
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
              queue: outputQueueName,
              noAck: false,
              queueOptions: {
                durable: true,
              }
            }
          });
        } catch (err) {
          logger.errorMessage(err);
          return err;
        }
      },
    },
    JobQueueService,
  ],
  exports: [
    JobQueueService
  ]
})
export class JobQueueModule { }
