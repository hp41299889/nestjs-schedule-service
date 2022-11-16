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
};