//import packages
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//import modules
import { TimeHelperModule } from 'src/util/time/timeHelper.module';
//import constants
import { MODULE } from './scheduleExecutionLog.constants';
//import models
import { ScheduleExecutionLog, ScheduleExecutionLogSchema } from './scheduleExecutionLog.schema';
//import services
import { ScheduleExecutionLogService } from './scheduleExecutionLog.service';

const {
    CONNECTION_NAME,    //
} = MODULE;

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: ScheduleExecutionLog.name, schema: ScheduleExecutionLogSchema
        }], CONNECTION_NAME),
        TimeHelperModule
    ],
    providers: [ScheduleExecutionLogService],
    exports: [ScheduleExecutionLogService]
})
export class ScheduleExecutionLogModule { };