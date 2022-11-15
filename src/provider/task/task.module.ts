import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { TaskService } from './task.service';

@Module({
    imports: [ScheduleModule.forRoot(), RabbitmqModule],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule { }