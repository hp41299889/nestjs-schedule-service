//import packages
import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/logger/logger.module';

//import modules
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
import { TaskModule } from '../task/task.module';
//import controllers
import { ScheduleController } from './schedule.controller';
//import services
import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    LoggerModule,
    ScheduleSetupModelModule,
    TaskModule
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
