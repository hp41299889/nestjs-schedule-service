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
        const { rabbitmqUsername, rabbitmqPassword, rabbitmqHost, rabbitmqQueueName } = rabbitmqConfig;

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${rabbitmqUsername}:${rabbitmqPassword}@${rabbitmqHost}`],
            queue: rabbitmqQueueName,
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
