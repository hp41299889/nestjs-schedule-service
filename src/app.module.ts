import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { MongoService } from './mongo/mongo.service';

@Module({
  imports: [
    ApiModule,
    MulterModule.register({
      dest: './upload'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useClass: MongoService
    })
  ],
  controllers: [AppController],
  providers: [AppService, MongoService],
})
export class AppModule { }