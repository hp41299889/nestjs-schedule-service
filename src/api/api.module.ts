import { Module } from '@nestjs/common';
import { CatModule } from 'src/mongo/cat/cat.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [CatModule],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule { }