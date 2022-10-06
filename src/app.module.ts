import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { ThingsboardModule } from './thingsboard/thingsboard.module';
import { RabbitModule } from './rabbit/rabbit.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApiModule,
    ThingsboardModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    MulterModule.register({
      dest: './upload'
    }),
    RabbitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }