//import packages
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { JsonrpcMessageDto } from "../jobQueue/jobQueue.dto";

export class CreateScheduleDto {
    @ApiProperty({ default: 'Swagger' })
    commandSource: string;

    @ApiProperty({ default: 'schedule_1' })
    scheduleName: string;

    @ApiProperty({ default: 'cycle' })
    scheduleType: string;

    @ApiPropertyOptional({ default: ['regular#1/0/0'] })
    regular: string[];

    @ApiPropertyOptional({ default: ['cycle#0/1'] })
    cycle: string[];

    @ApiProperty({
        default: {
            jsonrpc: '2.0',
            method: 'ScheduleServcie/ScheduleSetup/create',
            params: {},
        }
    })
    MQCLI: JsonrpcMessageDto;
};

export class ReadScheduleDto {
    @ApiProperty({ default: 1 })
    scheduleID: number;
};

export class UpdateScheduleDto extends ReadScheduleDto {
    @ApiPropertyOptional()
    commandSource: string;

    @ApiPropertyOptional()
    scheduleName: string;

    @ApiPropertyOptional()
    scheduleType: string;

    @ApiPropertyOptional()
    regular: [string];

    @ApiPropertyOptional()
    cycle: [string];

    @ApiPropertyOptional()
    MQCLI: JsonrpcMessageDto;
};

export class DeleteScheduleDto extends ReadScheduleDto {

};