import { ApiProperty } from "@nestjs/swagger/dist";

export class WhisperDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    sex: string;

    @ApiProperty()
    message: string;
};

export class ApiMessageDto {
    name: string;
    message: string;
    files?: any;
};
