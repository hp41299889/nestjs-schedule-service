import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { AppConfig } from './config/config.interface';
import { SwaggerService } from './swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const configService: ConfigService = app.get(ConfigService);
  const appConfig: AppConfig = configService.get('app');
  const appSwagger: SwaggerService = app.get(SwaggerService);
  const { appEnv, appName, appPrefix, appPort, appServices } = appConfig;
  app.setGlobalPrefix(appPrefix);
  const service = `${appName} is running on ${appPort} for ${appEnv}`;

  appSwagger.setupSwagger(app);
  await app.listen(appPort);
  console.log(service);
};
bootstrap();