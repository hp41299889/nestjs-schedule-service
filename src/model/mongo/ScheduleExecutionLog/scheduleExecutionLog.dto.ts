import { JsonrpcMessageDto } from "src/provider/jobQueue/jobQueue.dto";
export class CreateScheduleExecutionLogDto {
    readonly scheduleID: number;
    readonly scheduleName: string;
    readonly scheduleType: string;
    readonly processDatetime: Date;
    readonly processStatus: string;
    readonly schedule: string;
    readonly MQCLI: JsonrpcMessageDto;
};

export class FindPeriodDto {
    readonly scheduleID?: number;
    readonly start: Date;
    readonly end: Date;
};