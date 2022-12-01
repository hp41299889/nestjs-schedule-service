//import packages
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

//import modules
import { JsonModule } from 'src/config/json/json.module';
import { LoggerModule } from 'src/common/logger/logger.module';
import { EnvModule } from 'src/config/env/env.module';
//import constants
import { MODULE } from './jobQueue.constants';
//import dtos
import { QueueConnectionDto } from '../../service/setup/setup.dto';
//import services
import { JobQueueService } from './jobQueue.service';
import { JsonService } from 'src/config/json/json.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { ConfigService } from '@nestjs/config';

const {
  CONNECTION_NAME,  //connection name for JobQueue
  SETUP_ALIAS,      //alias for JsonService
  ENV_ALIAS,        //alias for ConfigService
  FAIL_USEING_ENV,    //connect by setup.json fail and useing default .env
} = MODULE;

@Module({
  imports: [JsonModule, LoggerModule, EnvModule],
  providers: [
    {
      provide: CONNECTION_NAME,
      inject: [JsonService, LoggerService, ConfigService],
      useFactory: async (jsonService: JsonService, logger: LoggerService, configService: ConfigService) => {
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
              serializer: {
                serialize: value => value.data,
              },
              noAck: false,
              persistent: true,
              queueOptions: {
                durable: true,
              }
            }
          });
        } catch (err) {
          logger.errorMessage(FAIL_USEING_ENV);
          const jobQueueEnv: QueueConnectionDto = configService.get(ENV_ALIAS);
          const { IP, port, account, password, inputQueueName, outputQueueName } = jobQueueEnv;
          const material = {
            connectionName: CONNECTION_NAME,
            config: jobQueueEnv
          };
          logger.factoryDebug(material);
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${account}:${password}@${IP}:${port}`],
              queue: outputQueueName,
              serializer: {
                serialize: value => value.data,
              },
              noAck: false,
              queueOptions: {
                durable: true
              }
            }
          })
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
