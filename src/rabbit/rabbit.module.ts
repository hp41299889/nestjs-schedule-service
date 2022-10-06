import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RabbitService } from './rabbit.service';
import { RabbitController } from './rabbit.controller';

@Module({
  imports: [
    ClientsModule.register([{
      name: 'danny_service',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://dannylu:roxy1029@192.168.36.51:5672'],
        queue: 'danny_queue',
        queueOptions: {
          durable: false
        }
      }
    }])
  ],
  providers: [RabbitService],
  controllers: [RabbitController]
})
export class RabbitModule { }
