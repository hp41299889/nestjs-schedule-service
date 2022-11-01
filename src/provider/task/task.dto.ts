import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AddTaskDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    seconds: number;

    @ApiProperty()
    message: string;
};

export class DeleteTaskDto {
    @ApiProperty()
    name: string;
};