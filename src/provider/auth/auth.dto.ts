import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthDto {
    @ApiProperty()
    account: string;

    @ApiProperty()
    password: string;
};