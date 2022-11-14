import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { TaskService } from './task.service';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
    imports: [ScheduleModule.forRoot(), RabbitmqModule],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule { }