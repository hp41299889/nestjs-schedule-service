//import packages
import { Injectable } from '@nestjs/common';
import { createConnection } from 'typeorm';

//import dtos
import { PostgreConnectTestSetupDto, MongoConnectTestSetupDto } from 'src/provider/setup/setup.dto';

@Injectable()
export class DatabaseService {
    constructor(

    ) { };

    async testPostgresConnection(data: PostgreConnectTestSetupDto) {
        const { IP, port, account, password, DBName } = data;
        return createConnection({
            type: 'postgres',
            username: account,
            password: password,
            host: IP,
            port: +port,
            database: DBName
        }).then(async connection => {
            await connection.close();
        });
    };

    async testMongoConnection(data: MongoConnectTestSetupDto) {
        const { IP, port, account, password, DBName } = data;
        return createConnection({
            type: 'mongodb',
            username: account,
            password: password,
            host: IP,
            port: +port,
            database: DBName
        }).then(async connection => {
            await connection.close();
        });
    };
};