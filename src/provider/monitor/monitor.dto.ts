import { ApiProperty } from "@nestjs/swagger";

export class ResendMonitorDto {
    @ApiProperty()
    scheduleID: string;

    @ApiProperty()
    scheduleName: string;

    @ApiProperty()
    scheduleType: string;

    @ApiProperty()
    schedule: string;

    @ApiProperty()
    MQCLI: string;
};