import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PerfectCubicSumDto {
    @ApiProperty()
    a: number;

    @ApiProperty()
    b: number;

    @ApiPropertyOptional()
    reqNo: number;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    message: string;
};