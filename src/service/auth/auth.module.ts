//import packages
import { Module } from '@nestjs/common';

//import modules
import { LoggerModule } from 'src/common/logger/logger.module';
import { JsonModule } from 'src/config/json/json.module';
//import controllers
import { AuthController } from './auth.controller';
//import services
import { AuthService } from './auth.service';

@Module({
  imports: [
    JsonModule,
    LoggerModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { };