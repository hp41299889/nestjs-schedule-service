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
    @ApiProperty({ default: 1 })
    scheduleID: number;

    @ApiProperty({ default: 'schedule_1' })
    scheduleName: string;

    @ApiProperty({ default: 'cycle' })
    scheduleType: string;

    @ApiProperty({ default: 'cycle#0/1' })
    schedule: string;

    @ApiProperty({
        default: {
            jsonrpc: '2.0',
            method: 'ScheduleServcie/ScheduleSetup/create',
            params: {},
        }
    })
    MQCLI: JsonrpcMessageDto;
};

export class BuildWeekTasksDto {
    cycle?: string;
    regular?: string;
};