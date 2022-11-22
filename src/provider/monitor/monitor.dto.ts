//import packages
import { ApiProperty } from "@nestjs/swagger";

import { JsonrpcMessageDto } from "../jobQueue/jobQueue.dto";
import { ScheduleExecutionLog } from "src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.schema";

export class WeekLogsDto {
    scheduleID: number;
    scheduleType: string;
    schedule: string[];
    weekLog: ScheduleExecutionLog[];
};

export class ResendMonitorDto {
    @ApiProperty()
    scheduleID: number;

    @ApiProperty()
    scheduleName: string;

    @ApiProperty()
    scheduleType: string;

    @ApiProperty()
    schedule: string;

    @ApiProperty()
    MQCLI: JsonrpcMessageDto;
};