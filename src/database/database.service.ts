import { Injectable } from '@nestjs/common';
import { getConnectionToken, InjectDataSource } from '@nestjs/typeorm';
import { createConnection, DataSource, getConnection } from 'typeorm';

@Injectable()
export class DatabaseService {
    constructor(
        // @InjectDataSource('postgreConnection')
        // private dataSource: DataSource
    ) { };

    async testConnection(data: any) {
        // await this.dataSource.destroy();
        // return createConnection({
        //     ...data
        // }).then(async connection => {
        //     console.log(connection);

        //     await connection.close();
        // })
    };

    async editConnection(data: any) {
        // await this.dataSource.destroy();
        // console.log(this.dataSource);

        // return createConnection({
        //     name: 'postgreConnection',
        //     ...data
        // })
    };
};