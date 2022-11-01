import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCatDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly age: number;

    @ApiProperty()
    readonly sex: string;
};

export class UpdateCatDto {
    @ApiPropertyOptional()
    readonly name: string;

    @ApiPropertyOptional()
    readonly age: number;

    @ApiPropertyOptional()
    readonly sex: string;
};