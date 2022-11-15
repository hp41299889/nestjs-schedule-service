import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { ConfigModule } from 'src/config/config.module';
import { SCHEDULE_QUEUE } from './rabbitmq.constants';
import { QueueConfigDto } from 'src/config/json/json.dto';
import { RabbitmqService } from './rabbitmq.service';
import { JsonService } from 'src/config/json/json.service';

const {
  PROVIDE,
  JSON_KEY
} = SCHEDULE_QUEUE;

@Module({
  imports: [ConfigModule,],
  providers: [
    {
      provide: PROVIDE,
      useFactory: (jsonService: JsonService) => {
        const rabbitmqConfig: QueueConfigDto = jsonService.read(JSON_KEY);
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
