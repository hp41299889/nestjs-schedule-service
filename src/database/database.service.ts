//import packages
import { Injectable } from '@nestjs/common';
import { createConnection } from 'typeorm';

//import constants
import { SERVICE } from './database.constants';
//import dtos
import { DatabaseConnectionDto } from 'src/provider/setup/setup.dto';
//import services
import { LoggerService } from 'src/common/logger/logger.service';

const {
    TESTMONGOCONNECTION_METHOD,     //testMongoConnection()
    TESTPOSTGRESCONNECTION_METHOD,  //testPostgresConnection()
} = SERVICE;

@Injectable()
export class DatabaseService {
    constructor(
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(DatabaseService.name);
    };

    async testPostgresConnection(data: DatabaseConnectionDto): Promise<object> {
        try {
            this.logger.serviceDebug(TESTPOSTGRESCONNECTION_METHOD);
            const { IP, port, account, password, DBName } = data;
            const connection = await createConnection({
                type: 'postgres',
                username: account,
                password: password,
                host: IP,
                port: +port,
                database: DBName
            });
            if (!connection) {
                throw 'connect fail';
            } else {
                await connection.destroy();
                return { results: 'Success' };
            };
        } catch (err) {
            throw err;
        };
    };

    async testMongoConnection(data: DatabaseConnectionDto): Promise<object> {
        try {
            this.logger.serviceDebug(TESTMONGOCONNECTION_METHOD);
            const { IP, port, account, password, DBName } = data;
            const connection = await createConnection({
                type: 'mongodb',
                username: account,
                password: password,
                host: IP,
                port: +port,
                database: DBName
            });
            if (!connection) {
                throw 'connect fail';
            } else {
                await connection.destroy();
                return { results: 'Success' };
            };
        } catch (err) {
            throw err;
        };
    };
};