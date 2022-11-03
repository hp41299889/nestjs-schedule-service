import { ApiProperty } from "@nestjs/swagger";

export class CreateScheduleDto {
    @ApiProperty()
    commandSource: string;

    @ApiProperty()
    scheduleName: string;

    @ApiProperty()
    schduleType: string;

    @ApiProperty()
    regular: [];

    @ApiProperty()
    cycle: [];

    @ApiProperty()
    MQCLI: string;
};

export class UpdateScheduleDto extends CreateScheduleDto {
    @ApiProperty()
    scheduleID: string;

    // @ApiProperty()
    // commandSource: string;

    // @ApiProperty()
    // scheduleName: string;

    // @ApiProperty()
    // schduleType: string;

    // @ApiProperty()
    // regular: [];

    // @ApiProperty()
    // cycle: [];

    // @ApiProperty()
    // MQCLI: string;
};

export class DeleteScheduleDto {
    @ApiProperty()
    scheduleID: string;
};