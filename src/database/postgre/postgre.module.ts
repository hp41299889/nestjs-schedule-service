import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogModule } from './dog/dog.module';
import { PostgreService } from './postgre.service';
import { PostgreConfigModule } from 'src/config/database/postgre/postgre.config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgreService
    }),
    DogModule,
    PostgreConfigModule
  ],
  providers: [
    PostgreService
  ]
})
export class PostgreModule { };