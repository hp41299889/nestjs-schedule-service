//import packages
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

//import dtos
import { JsonrpcMessageDto } from "../../provider/jobQueue/jobQueue.dto";
//import models
import { ScheduleSetup } from "src/model/postgre/scheduleSetup/scheduleSetup.entity";

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
            "jsonrpc": "2.0",
            "method": "ScheduleServcie/ScheduleSetup/create",
            "params": {}
        }
    })
    MQCLI: JsonrpcMessageDto;
};


export class ScheduleSetupsDto {
    scheduleID: number;

    createDatetime: Date;

    lastEditDatetime: Date;

    commandSource: string;

    scheduleName: string;

    scheduleType: string;

    regular: string[];

    cycle: string[];

    MQCLI: string;
};

export class ReadScheduleDto {
    @ApiProperty({ default: 1 })
    scheduleID: number;
};

export class UpdateScheduleDto extends ReadScheduleDto {
    @ApiPropertyOptional({ default: 'Swagger' })
    commandSource: string;

    @ApiPropertyOptional()
    scheduleName: string;

    @ApiPropertyOptional({ default: 'cycle' })
    scheduleType: string;

    @ApiPropertyOptional({ default: ['regular#1/0/0'] })
    regular: [string];

    @ApiPropertyOptional({ default: ['cycle#0/1'] })
    cycle: [string];

    @ApiPropertyOptional({
        default: {
            jsonrpc: '2.0',
            method: 'ScheduleServcie/ScheduleSetup/create',
            params: {}
        }
    })
    MQCLI: JsonrpcMessageDto;
};

export class DeleteScheduleDto extends ReadScheduleDto {

};