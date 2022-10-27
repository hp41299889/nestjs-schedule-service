import { Module } from '@nestjs/common';
// import { HttpModule } from '@nestjs/axios';
import { MulterModule } from '@nestjs/platform-express';
// import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppConfigModule } from './config/app.config.module';
import { SwaggerModule } from './swagger/swagger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    AppConfigModule,
    SwaggerModule,
    RabbitmqModule,
    ScheduleModule.forRoot(),
    TaskModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }