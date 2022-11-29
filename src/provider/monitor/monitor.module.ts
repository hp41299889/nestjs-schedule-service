//import packages
import { Module } from '@nestjs/common';

//import modules
import { CommonModule } from 'src/common/common.module';
import { TimeHelperModule } from 'src/util/time/timeHelper.module';
import { JobQueueModule } from '../jobQueue/jobQueue.module';
import { ExecutionLogModule } from '../executionLog/executionLog.module';
import { TaskModule } from '../task/task.module';
//import models
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
import { ScheduleExecutionLogModelModule } from 'src/model/mongo/ScheduleExecutionLog/ScheduleExecutionLog.module';
//import controllers
import { MonitorController } from './monitor.controller';
//import services
import { MonitorService } from './monitor.service';

@Module({
  imports: [
    CommonModule,
    ScheduleSetupModelModule,
    ScheduleExecutionLogModelModule,
    TimeHelperModule,
    JobQueueModule,
    ExecutionLogModule,
    TaskModule
  ],
  providers: [MonitorService],
  controllers: [MonitorController]
})
export class MonitorModule { }
