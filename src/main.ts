import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const configService = new ConfigService();

  const rabbitMQ = {
    username: configService.get('RABBITMQ_USERNAME'),
    password: configService.get('RABBITMQ_PASSWORD'),
    host: configService.get('RABBITMQ_HOST'),
    port: configService.get('RABBITMQ_PORT'),
    queueName: configService.get('RABBITMQ_QUEUE_NAME')
  };

  app.setBaseViewsDir(join(__dirname, '..', 'client'));
  app.setViewEngine('hbs');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rabbitMQ.username}:${rabbitMQ.password}@${rabbitMQ.host}:${rabbitMQ.port}`],
      queue: rabbitMQ.queueName,
      queueOptions: {
        durable: false
      }
    }
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();