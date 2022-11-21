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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bufferLogs: true
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
    })
  );

  app.setGlobalPrefix(prefix);
  appSwagger.setupSwagger(app);
  await taskService.rebornTasks();

  await app.listen(port);
  console.log(service);
};
bootstrap();