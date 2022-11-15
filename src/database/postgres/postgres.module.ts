import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ConfigModule } from 'src/config/config.module';
import { ScheduleSetup } from 'src/model/postgre/scheduleSetup/scheduleSetup.entity';
import { ScheduleSetupModelModule } from 'src/model/postgre/scheduleSetup/scheduleSetup.module';
import { JsonService } from 'src/config/json/json.service';
import { PostgreSQLConfigDto } from 'src/config/json/json.dto';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: 'postgresConnection',
            imports: [ConfigModule],
            inject: [JsonService],
            useFactory: async (jsonService: JsonService) => {
                const postgresConfig: PostgreSQLConfigDto = jsonService.read('postgreSQL');
                const { IP, port, account, password, DBName } = postgresConfig;
                return {
                    type: 'postgres',
                    username: account,
                    password: password,
                    host: IP,
                    port: +port,
                    database: DBName,
                    entities: [ScheduleSetup],
                    synchronize: true
                }
            }
        }),
        ScheduleSetupModelModule,
    ],
})
export class PostgresModule { }