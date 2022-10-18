import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateCatDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly age: number;

    @ApiProperty()
    readonly breed: string;
}