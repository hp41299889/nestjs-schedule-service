//import packages
import { ApiProperty } from '@nestjs/swagger';

//import models
import { ScheduleExecutionLog } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.schema';

export enum dateIntervalEnum {
    '前一日' = 'day',
    '前一週' = 'week',
    '前一月' = 'month',
    '前一年' = 'year'
};

export class QueryDto {
    @ApiProperty({ default: new Date().toLocaleDateString() })
    startDate: string;

    @ApiProperty({ enum: Object.keys(dateIntervalEnum) })
    dateInterval: dateIntervalEnum;
};

export class ExecutionLogsDto extends ScheduleExecutionLog {
    scheduleLogID?: object | string;
};