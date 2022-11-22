//import packages
import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/logger/logger.module';

//import modules
import { JsonModule } from 'src/config/json/json.module';
import { ConnectionModule } from 'src/database/connection/connection.module';
//import controllers
import { SetupController } from './setup.controller';
//import services
import { SetupService } from './setup.service';

@Module({
  imports: [
    LoggerModule,
    JsonModule,
    ConnectionModule
  ],
  providers: [SetupService],
  controllers: [SetupController]
})
export class SetupModule { }
