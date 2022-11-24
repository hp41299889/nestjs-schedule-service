//import packages
import { Injectable } from '@nestjs/common';
import { } from '@nestjs/typeorm'
import { createConnection, DataSource } from 'typeorm';

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
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext(ConnectionService.name);
    };

    async testPostgresConnection(data: DatabaseConnectionDto): Promise<void> {
        try {
            this.logger.serviceDebug(TESTPOSTGRESCONNECTION_METHOD);
            const { IP, port, account, password, DBName } = data;
            const dataSource = new DataSource({
                type: 'postgres',
                username: account,
                password: password,
                host: IP,
                port: +port,
                database: DBName,
            });
            const connection = await dataSource.initialize();
            await connection.destroy();
        } catch (err) {
            throw 'postgres connection fail'
        };
    };

    async testMongoConnection(data: DatabaseConnectionDto): Promise<void> {
        try {
            this.logger.serviceDebug(TESTMONGOCONNECTION_METHOD);
            const { IP, port, account, password, DBName } = data;
            const dataSource = new DataSource({
                type: 'mongodb',
                username: account,
                password: password,
                host: IP,
                port: +port,
                database: DBName
            });
            const connection = await dataSource.initialize();
            await connection.destroy();
        } catch (err) {
            throw 'mongo connection fail';
        };
    };
};