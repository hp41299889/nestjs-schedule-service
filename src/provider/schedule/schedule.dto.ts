import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateScheduleDto {
    @ApiProperty()
    commandSource: string;

    @ApiProperty()
    scheduleName: string;

    @ApiProperty()
    scheduleType: string;

    @ApiPropertyOptional()
    regular: [];

    @ApiPropertyOptional()
    cycle: [];

    @ApiProperty()
    MQCLI: string;
};

export class UpdateScheduleDto {
    @ApiProperty()
    scheduleID: number;

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
    scheduleID: number;
};