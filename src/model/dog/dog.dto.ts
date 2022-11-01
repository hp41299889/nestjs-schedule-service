import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateDogDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly age: number;

    @ApiProperty()
    readonly sex: string;
};

export class UpdateDogDto {
    @ApiPropertyOptional()
    readonly name: string;

    @ApiPropertyOptional()
    readonly age: number;

    @ApiPropertyOptional()
    readonly sex: string;
};