import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { LoginAuthDto } from '../auth/auth.dto';
import { QueueConfigDto } from 'src/config/json/json.dto';

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
    queue: QueueConfigDto;

    @ApiPropertyOptional()
    admin: LoginAuthDto;

    @ApiPropertyOptional()
    postgreSQL: PostgreConnectTestSetupDto;

    @ApiPropertyOptional()
    mongoDB: MongoConnectTestSetupDto;
};