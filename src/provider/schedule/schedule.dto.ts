import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateScheduleDto {
    @ApiProperty({ default: 'Swagger' })
    commandSource: string;

    @ApiProperty()
    scheduleName: string;

    @ApiProperty({ default: 'cycle' })
    scheduleType: string;

    @ApiPropertyOptional()
    regular: string[];

    @ApiPropertyOptional()
    cycle: string[];

    @ApiProperty({ default: '' })
    MQCLI: string;
};

export class ReadScheduleDto {
    @ApiProperty()
    scheduleID: number;
};

export class UpdateScheduleDto {
    @ApiProperty()
    scheduleID: number;

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
    MQCLI: string;
};

export class DeleteScheduleDto {
    @ApiProperty()
    scheduleID: number;
};