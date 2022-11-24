//import dtos
import { CreateScheduleDto, UpdateScheduleDto } from "../schedule/schedule.dto";

export class CreateTaskDto extends CreateScheduleDto {
    scheduleID?: number;
};

export class UpdateTaskDto {
    oldTask: CreateTaskDto;
    newData: UpdateScheduleDto;
};

export class DeleteTaskDto {
    scheduleName: string;
    scheduleType: string;
    cycle?: string[];
    regular?: string[];
};

export class TaskExecuteDto {
    scheduleType: string;
    cycle?: string;
    regular?: string;
};