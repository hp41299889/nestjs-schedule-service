//import packages
import { Module } from '@nestjs/common';

//import modules
import { ConfigModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/database/database.module';
//import controllers
import { SetupController } from './setup.controller';
//import services
import { SetupService } from './setup.service';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [SetupService],
  controllers: [SetupController]
})
export class SetupModule { }
