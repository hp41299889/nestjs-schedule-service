//import packages
import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';

//import modules
import { JsonModule } from 'src/config/json/json.module';
import { ConnectionModule } from 'src/database/connection/connection.module';
//import controllers
import { SetupController } from './setup.controller';
//import services
import { SetupService } from './setup.service';

@Module({
  imports: [
    CommonModule,
    JsonModule,
    ConnectionModule
  ],
  providers: [SetupService],
  controllers: [SetupController]
})
export class SetupModule { }
