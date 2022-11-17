export class CreateScheduleExecutionLogDto {
    readonly scheduleID: number;
    readonly scheduleName: string;
    readonly scheduleType: string;
    readonly processDatetime: Date;
    readonly processStatus: string;
    readonly schedule: string;
    readonly MQCLI: string;
};

export class FindWeekDto {
    readonly scheduleID: number
};

export class FindPeriodDto {
    readonly start: Date;
    readonly end: Date;
};