import { ApiProperty } from "@nestjs/swagger";

export class QueryExecutionLogDto {
    @ApiProperty()
    startDate: string;

    @ApiProperty()
    dateInterval: string;
};

export class ScheduleExecutionLogDto {
    scheduleLogID: string;
    scheduleID: string;
    scheduleName: string;
    scheduleType: string;
    processDatetime: string;
    processStatus: string;
    schedule: string;
    MQCLI: string;
};