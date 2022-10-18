import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateDogDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    sex: string;
}