//import dtos
import { JsonrpcMessageDto } from "src/provider/jobQueue/jobQueue.dto";

export class CreateScheduleExecutionLogDto {
    scheduleID: number;
    scheduleName: string;
    scheduleType: string;
    processDatetime: Date;
    processStatus?: string;
    schedule: string;
    MQCLI: JsonrpcMessageDto;
};

export class FindPeriodDto {
    scheduleID?: number;
    start: Date;
    end: Date;
};