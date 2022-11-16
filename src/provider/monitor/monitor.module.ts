//import packages
import { Module } from '@nestjs/common';

//import modules
import { TaskModule } from '../task/task.module';
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
import { ScheduleExecutionLogModule } from 'src/model/mongo/ScheduleExecutionLog/ScheduleExecutionLog.module';
//import controllers
import { MonitorController } from './monitor.controller';
//import services
import { MonitorService } from './monitor.service';

@Module({
  imports: [
    ScheduleSetupModelModule,
    ScheduleExecutionLogModule,
    TaskModule
  ],
  providers: [MonitorService],
  controllers: [MonitorController]
})
export class MonitorModule { }
