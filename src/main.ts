//import packages
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { join } from 'path';

//import modules
import { AppModule } from './app.module';
//import services
import { SwaggerService } from './swagger/swagger.service';
import { TaskService } from './provider/task/task.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService: ConfigService = app.get(ConfigService);
  const appSwagger: SwaggerService = app.get(SwaggerService);
  const taskService = app.get(TaskService);
  const appConfig: any = configService.get('app');
  const { name, env, prefix, port } = appConfig;
  const service = `${name} is running on ${port} for ${env}`;

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'public/html'));
  app.setViewEngine('hbs');
  app.use(
    session({
      secret: 'abc',
      name: 'token',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 10 }
      // cookie: { maxAge: 1000 * 3 }
    })
  );
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://dannylu:roxy1029@192.168.36.51:5672'],
      queue: 'schedule_queue',
      noAck: false,
      queueOptions: {
        durable: true
      }
    }
  });
  app.setGlobalPrefix(prefix);
  appSwagger.setupSwagger(app);

  await app.startAllMicroservices();
  await app.listen(port | 3000);
  console.log(service);
  await taskService.rebornTasks();
};
bootstrap();