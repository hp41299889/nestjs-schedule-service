import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

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
    @ApiPropertyOptional()
    enableScheduleService: boolean;

    @ApiPropertyOptional()
    queue: object;

    @ApiPropertyOptional()
    admin: object;

    @ApiPropertyOptional()
    postgreSQL: PostgreConnectTestSetupDto;

    @ApiPropertyOptional()
    mongoDB: MongoConnectTestSetupDto;
};