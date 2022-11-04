import { ApiProperty } from "@nestjs/swagger";

export class PostgreConnectTestSetupDto {
    @ApiProperty()
    IP: string;

    @ApiProperty()
    port: string;

    @ApiProperty()
    account: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    DBName: string;
};

export class MongoConnectTestSetupDto {
    @ApiProperty()
    IP: string;

    @ApiProperty()
    port: string;

    @ApiProperty()
    account: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    DBName: string;
};

export class SaveSetupDto {
    @ApiProperty()
    enableScheduleService: boolean;

    @ApiProperty()
    queue: object;

    @ApiProperty()
    admin: object;

    @ApiProperty()
    postgreSQL: PostgreConnectTestSetupDto;

    @ApiProperty()
    mongoDB: MongoConnectTestSetupDto;
};