//import packages
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as session from 'express-session';
import * as hbs from 'hbs';

//import modules
import { AppModule } from './app.module';
//import dtos
import { QueueConnectionDto } from './service/setup/setup.dto';
//import services
import { SwaggerService } from './swagger/swagger.service';
import { TaskService } from './provider/task/task.service';
import { JsonService } from './config/json/json.service';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService: ConfigService = app.get(ConfigService);
  const appSwagger: SwaggerService = app.get(SwaggerService);
  const jsonService: JsonService = app.get(JsonService);
  const taskService = app.get(TaskService);
  const logger = await app.resolve(LoggerService);
  const appConfig: any = configService.get('app');
  const bossQueueConfig: QueueConnectionDto = await jsonService.read('bossQueue');
  const bossQueueEnv: QueueConnectionDto = configService.get('bossQueue');
  const { IP, account, password, inputQueueName, outputQueueName } = bossQueueConfig;
  const { name, env, prefix, port } = appConfig;
  const service = `${name} is running on ${port} for ${env}`;

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'public', 'html'));
  hbs.registerPartials(join(__dirname, '..', 'public', 'html', 'partials'));
  app.setViewEngine('hbs');
  app.use(
    session({
      secret: 'abc',
      name: 'token',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 }
    })
  );
  try {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${account}:${password}@${IP}:${bossQueueConfig.port}`],
        queue: inputQueueName,
        noAck: false,
        queueOptions: {
          durable: true
        }
      }
    });
  } catch (err) {
    logger.errorMessage('Warning!bossQueue connect by setup.json fail,useing default env');
    const { IP, port, account, password, inputQueueName, outputQueueName } = bossQueueEnv;
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${account}:${password}@${IP}:${port}`],
        queue: inputQueueName,
        noAck: false,
        queueOptions: {
          durable: true
        }
      }
    });
  };
  app.setGlobalPrefix(prefix);
  appSwagger.setupSwagger(app);

  await app.startAllMicroservices();
  await app.listen(port | 3000);
  console.log(service);
  await taskService.rebornTasks();
};
bootstrap();