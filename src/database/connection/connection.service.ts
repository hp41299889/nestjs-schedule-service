//import packages
import { Injectable } from '@nestjs/common';
import { createConnection } from 'typeorm';

//import constants
import { SERVICE } from './connection.constants';
//import dtos
import { DatabaseConnectionDto } from 'src/provider/setup/setup.dto';
//import services
import { LoggerService } from 'src/common/logger/logger.service';

const {
    TESTMONGOCONNECTION_METHOD,     //testMongoConnection()
    TESTPOSTGRESCONNECTION_METHOD,  //testPostgresConnection()
} = SERVICE;

@Injectable()
export class ConnectionService {
    constructor(
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(ConnectionService.name);
    };

    async testPostgresConnection(data: DatabaseConnectionDto): Promise<{ results: string }> {
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
                await connection.destroy();
                return { results: 'bad' };
            } else {
                await connection.destroy();
                return { results: 'Success' };
            };
        } catch (err) {
            return err
        };
    };

    async testMongoConnection(data: DatabaseConnectionDto): Promise<{ results: string }> {
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
                await connection.destroy();
                return { results: 'bad' };
            } else {
                await connection.destroy();
                return { results: 'Success' };
            };
        } catch (err) {
            return err;
        };
    };
};