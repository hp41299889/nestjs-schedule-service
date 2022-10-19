import { Module } from '@nestjs/common';

import { CatModule } from 'src/database/mongo/cat/cat.module';
import { DogModule } from 'src/database/postgre/dog/dog.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [
    CatModule,
    DogModule
  ],
  controllers: [
    ApiController
  ],
  providers: [
    ApiService
  ]
})
export class ApiModule { };