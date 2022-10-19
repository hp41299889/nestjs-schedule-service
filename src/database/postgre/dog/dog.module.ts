import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogService } from './dog.service';
import { Dog } from './dog.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Dog])
  ],
  providers: [
    DogService
  ],
  exports: [
    DogService
  ]
})
export class DogModule { };