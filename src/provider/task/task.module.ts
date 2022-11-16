//import packages
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

//import modules
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { ScheduleExecutionLogModule } from 'src/model/mongo/ScheduleExecutionLog/ScheduleExecutionLog.module';
//import services
import { TaskService } from './task.service';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ScheduleExecutionLogModule,
        RabbitmqModule
    ],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule { }