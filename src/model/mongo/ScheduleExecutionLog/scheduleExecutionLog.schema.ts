//import packages
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//import dtos
import { JsonrpcMessageDto } from 'src/provider/jobQueue/jobQueue.dto';

export type ScheduleExecutionLogDocument = HydratedDocument<ScheduleExecutionLog>;

@Schema()
export class ScheduleExecutionLog {
    @Prop()
    scheduleID: number;

    @Prop()
    scheduleName: string;

    @Prop()
    scheduleType: string;

    @Prop({ required: false })
    processDatetime?: Date;

    @Prop()
    processStatus: string;

    @Prop()
    schedule: string;

    @Prop()
    MQCLI: JsonrpcMessageDto;
};

export const ScheduleExecutionLogSchema = SchemaFactory.createForClass(ScheduleExecutionLog);