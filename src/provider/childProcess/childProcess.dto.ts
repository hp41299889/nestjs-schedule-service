import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ChildProcessDto {
    @ApiProperty()
    script: string;

    @ApiProperty()
    name: string;

    @ApiPropertyOptional()
    message: string;
};