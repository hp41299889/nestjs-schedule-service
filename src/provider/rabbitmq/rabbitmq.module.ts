//import packages
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

//import modules
import { ConfigModule } from 'src/config/config.module';
//import constants
import { MODULE } from './rabbitmq.constants';
//import dtos
import { QueueConfigDto } from 'src/config/json/json.dto';
//import services
import { RabbitmqService } from './rabbitmq.service';
import { JsonService } from 'src/config/json/json.service';

const {
  PROVIDE_NAME, //
  SETUP_ALIAS,  //
} = MODULE;

@Module({
  imports: [ConfigModule,],
  providers: [
    {
      provide: PROVIDE_NAME,
      useFactory: (jsonService: JsonService) => {
        const rabbitmqConfig: QueueConfigDto = jsonService.read(SETUP_ALIAS);
        const { IP, port, account, password, inputQueueName, outputQueueName } = rabbitmqConfig;

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${account}:${password}@${IP}:${port}`],
            queue: outputQueueName,
            noAck: false,
            queueOptions: {
              durable: true
            }
          }
        })
      },
      inject: [JsonService]
    },
    RabbitmqService,
  ],
  exports: [
    RabbitmqService
  ]
})
export class RabbitmqModule { }
