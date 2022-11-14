import { CreateScheduleDto } from "../schedule/schedule.dto";

export class UpdateTaskDto {
    scheduleName: string;
    scheduleType: string;
    newData: CreateScheduleDto;
};

export class DeleteTaskDto {
    scheduleName: string;
    scheduleType: string;
};