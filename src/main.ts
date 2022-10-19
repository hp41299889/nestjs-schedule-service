import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app.config.service';
import { SwaggerService } from './swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const configService: ConfigService = app.get(ConfigService);
  const appConfig: AppConfigService = configService.get('app');
  const appSwagger: SwaggerService = app.get(SwaggerService);
  const port = appConfig.port;

  appSwagger.setupSwagger(app);

  await app.listen(port);
};
bootstrap();