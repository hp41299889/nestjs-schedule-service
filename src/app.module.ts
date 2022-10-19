import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { ApiModule } from './api/api.module';
import { MongoService } from './database/mongo/mongo.service';
import { PostgreService } from './database/postgre/postgre.service';
import { PostgreModule } from './database/postgre/postgre.module';
import { AppConfigModule } from './config/app/app.config.module';
import { AppConfigService } from './config/app/app.config.service';
import { SwaggerModule } from './swagger/swagger.module';
import { MongoModule } from './database/mongo/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AppConfigModule,
    SwaggerModule,
    ApiModule,
    PostgreModule,
    MongoModule,
    MulterModule.register({
      dest: './upload'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
    MongooseModule.forRootAsync({
      useClass: MongoService
    }),
  ],
  controllers: [

  ],
  providers: [

  ],
})
export class AppModule { }