import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ThingsboardModule } from 'src/thingsboard/thingsboard.module';

@Module({
  imports: [ThingsboardModule],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule { }