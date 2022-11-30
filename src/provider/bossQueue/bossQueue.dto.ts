//import packages
import { ApiProperty } from "@nestjs/swagger";

//import dtos
import { CreateScheduleDto, ReadScheduleDto, UpdateScheduleDto, DeleteScheduleDto } from "../../service/schedule/schedule.dto";

export class BossQueueMessageDto {
    @ApiProperty({ default: '2.0' })
    jsonrpc: string;

    @ApiProperty({ default: 'ScheduleService/ScheduleSetup/create' })
    method: string;

    @ApiProperty({
        default: {
            scheduleID: 1,
            commandSource: 'MQ',
            scheduleName: 'MQ_schedule_01',
            scheduleType: 'cycle',
            regular: [],
            cycle: ['cycle#0/1'],
            MQCLI: {
                "jsonrpc": "2.0",
                "method": "some method for MiddleService",
                "params": {}
            }
        }
    })
    params: CreateScheduleDto | ReadScheduleDto | UpdateScheduleDto | DeleteScheduleDto;
    // CreateScheduleDto | ReadScheduleDto | UpdateScheduleDto | DeleteScheduleDto;
};