//import packages
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

//import modules
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
//import models
import { ScheduleExecutionLogModelModule } from 'src/model/mongo/ScheduleExecutionLog/ScheduleExecutionLog.module';
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
//import services
import { TaskService } from './task.service';
import { LoggerModule } from 'src/common/logger/logger.module';

@Module({
    imports: [
        LoggerModule,
        ScheduleModule.forRoot(),
        ScheduleExecutionLogModelModule,
        ScheduleSetupModelModule,
        RabbitmqModule
    ],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule { }