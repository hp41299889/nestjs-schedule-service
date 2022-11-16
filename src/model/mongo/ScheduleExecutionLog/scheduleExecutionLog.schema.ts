//import packages
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScheduleExecutionLogDocument = HydratedDocument<ScheduleExecutionLog>;

@Schema()
export class ScheduleExecutionLog {
    @Prop()
    scheduleID: number;

    @Prop()
    scheduleName: string;

    @Prop()
    scheduleType: string;

    @Prop()
    processDatetime: Date;

    @Prop()
    processStatus: string;

    @Prop()
    schedule: string;

    @Prop()
    MQCLI: string;
};

export const ScheduleExecutionLogSchema = SchemaFactory.createForClass(ScheduleExecutionLog);