//import packages
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AdminDto {
    @ApiProperty()
    readonly account: string;
    @ApiProperty()
    readonly password: string;
};
export class ConnectionDto extends AdminDto {
    @ApiProperty()
    readonly IP: string;
    @ApiProperty()
    readonly port: string;
};

export class DatabaseConnectionDto extends ConnectionDto {
    @ApiProperty()
    readonly DBName: string;
};

export class QueueConnectionDto extends ConnectionDto {
    @ApiProperty()
    readonly inputQueueName: string;
    @ApiProperty()
    readonly outputQueueName: string;
};

export class SaveSetupDto {
    @ApiPropertyOptional()
    enableScheduleService: boolean;

    @ApiPropertyOptional()
    queue: QueueConnectionDto;

    @ApiPropertyOptional()
    admin: AdminDto;

    @ApiPropertyOptional()
    postgreSQL: DatabaseConnectionDto;

    @ApiPropertyOptional()
    mongoDB: DatabaseConnectionDto;
};