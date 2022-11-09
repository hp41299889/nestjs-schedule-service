import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqConfig } from 'src/config/config.interface';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule,],
  providers: [
    {
      provide: 'RabbitMQ',
      useFactory: (configService: ConfigService) => {
        const rabbitmqConfig: RabbitmqConfig = configService.get('rabbitmq');
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
      inject: [ConfigService]
    },
    RabbitmqService,
  ],
  exports: [
    RabbitmqService
  ]
})
export class RabbitmqModule { }
