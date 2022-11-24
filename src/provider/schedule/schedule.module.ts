//import packages
import { Module } from '@nestjs/common';

//import modules
import { TaskModule } from '../task/task.module';
import { CommonModule } from 'src/common/common.module';
//import models
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
//import controllers
import { ScheduleController } from './schedule.controller';
//import services
import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    CommonModule,
    ScheduleSetupModelModule,
    TaskModule
  ],
  providers: [ScheduleService],
  exports: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule { }
