//import packages
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

//import modules
import { JobQueueModule } from '../jobQueue/jobQueue.module';
import { LoggerModule } from 'src/common/logger/logger.module';
import { JsonModule } from 'src/config/json/json.module';
import { TimeHelperModule } from 'src/util/time/timeHelper.module';
//import models
import { ScheduleExecutionLogModelModule } from 'src/model/mongo/ScheduleExecutionLog/ScheduleExecutionLog.module';
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
//import services
import { TaskService } from './task.service';

@Module({
    imports: [
        LoggerModule,
        ScheduleModule.forRoot(),
        ScheduleExecutionLogModelModule,
        ScheduleSetupModelModule,
        JobQueueModule,
        JsonModule,
        TimeHelperModule
    ],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule { }