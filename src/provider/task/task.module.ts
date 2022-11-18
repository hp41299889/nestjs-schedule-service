//import packages
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

//import modules
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { ScheduleExecutionLogModule } from 'src/model/mongo/ScheduleExecutionLog/ScheduleExecutionLog.module';
//import services
import { TaskService } from './task.service';
import { LoggerModule } from 'src/common/logger/logger.module';

@Module({
    imports: [
        LoggerModule,
        ScheduleModule.forRoot(),
        ScheduleExecutionLogModule,
        RabbitmqModule
    ],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule { }