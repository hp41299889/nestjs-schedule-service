//import dtos
import { CreateScheduleDto, UpdateScheduleDto } from "../schedule/schedule.dto";

export class CreateTaskDto extends CreateScheduleDto {
    scheduleID?: number;
    action?: string;
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