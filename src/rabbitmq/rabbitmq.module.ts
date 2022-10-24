import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqConfig } from 'src/config/config.interface';
import { AppConfigModule } from 'src/config/app.config.module';

@Module({
  imports: [
    AppConfigModule,
  ],
  providers: [
    {
      provide: 'RabbitmqService',
      useFactory: (configService: ConfigService) => {
        const rabbitmqConfig: RabbitmqConfig = configService.get('rabbitmq');
        const { rabbitmqUsername, rabbitmqPassword, rabbitmqHost, rabbitmqQueueName } = rabbitmqConfig;

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${rabbitmqUsername}:${rabbitmqPassword}@${rabbitmqHost}`],
            queue: rabbitmqQueueName,
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
