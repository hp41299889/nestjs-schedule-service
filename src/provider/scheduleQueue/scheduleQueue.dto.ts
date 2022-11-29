//import packages
import { ApiProperty } from "@nestjs/swagger";

//import dtos
import { CreateScheduleDto, ReadScheduleDto, UpdateScheduleDto, DeleteScheduleDto } from "../../service/schedule/schedule.dto";

export class ScheduleQueueMessageDto {
    @ApiProperty({ default: '2.0' })
    jsonrpc: string;

    @ApiProperty({ default: 'ScheduleService/ScheduleSetup/create' })
    method: string;

    @ApiProperty({
        default: {
            commandSource: 'MQ',
            scheduleName: 'MQ_schedule_01',
            scheduleType: 'cycle',
            regular: [],
            cycle: ['cycle#0/1'],
            MQCLI: {}
        }
    })
    params: CreateScheduleDto | ReadScheduleDto | UpdateScheduleDto | DeleteScheduleDto;
};