import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateScheduleDto {
    @ApiProperty()
    commandSource: string;

    @ApiProperty()
    scheduleName: string;

    @ApiProperty()
    schduleType: string;

    @ApiPropertyOptional()
    regular: [string];

    @ApiPropertyOptional()
    cycle: [string];

    @ApiProperty()
    MQCLI: string;
};

export class UpdateScheduleDto {
    @ApiProperty()
    scheduleID: string;

    @ApiPropertyOptional()
    commandSource: string;

    @ApiPropertyOptional()
    scheduleName: string;

    @ApiPropertyOptional()
    schduleType: string;

    @ApiPropertyOptional()
    regular: [string];

    @ApiPropertyOptional()
    cycle: [string];

    @ApiPropertyOptional()
    MQCLI: string;
};

export class DeleteScheduleDto {
    @ApiProperty()
    scheduleID: string;
};