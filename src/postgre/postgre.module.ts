import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogModule } from './dog/dog.module';
import { PostgreService } from './postgre.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgreService
    }),
    DogModule
  ],
  providers: [PostgreService]
})
export class PostgreModule { }
