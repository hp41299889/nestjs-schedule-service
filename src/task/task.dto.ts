import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AddTaskDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    seconds: number;
};

export class DeleteTaskDto {
    @ApiProperty()
    name: string;
};