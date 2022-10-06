import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ThingsboardService } from './thingsboard.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule
  ],
  providers: [ThingsboardService],
  exports: [ThingsboardService]
})
export class ThingsboardModule { }