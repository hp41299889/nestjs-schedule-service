//import packages
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'src/common/logger/logger.module';

//import modules
import { TimeHelperModule } from 'src/util/time/timeHelper.module';
//import constants
import { MODULE } from './scheduleExecutionLog.constants';
//import schemas
import { ScheduleExecutionLog, ScheduleExecutionLogSchema } from './scheduleExecutionLog.schema';
//import models
import { ScheduleExecutionLogModel } from './scheduleExecutionLog.service';

const {
    CONNECTION_NAME,    //connection name for MongooseModule
} = MODULE;

@Module({
    imports: [
        LoggerModule,
        MongooseModule.forFeature([{
            name: ScheduleExecutionLog.name, schema: ScheduleExecutionLogSchema
        }], CONNECTION_NAME),
        TimeHelperModule
    ],
    providers: [ScheduleExecutionLogModel],
    exports: [ScheduleExecutionLogModel]
})
export class ScheduleExecutionLogModelModule { };