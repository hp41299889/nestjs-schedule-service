import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { RabbitmqService } from './rabbitmq.service';
import { ConfigModule } from 'src/config/config.module';
import { JsonService } from 'src/config/json/json.service';
import { QueueConfigDto } from 'src/config/json/json.dto';

@Module({
  imports: [ConfigModule,],
  providers: [
    {
      provide: 'RabbitMQ',
      useFactory: (jsonService: JsonService) => {
        const rabbitmqConfig: QueueConfigDto = jsonService.read('queue');
        const { IP, port, account, password, inputQueueName, outputQueueName } = rabbitmqConfig;

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
