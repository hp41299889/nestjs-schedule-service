//import packages
import { Injectable, Logger } from '@nestjs/common';
import pm2, { restart } from 'pm2';

//import constants
import { SERVICE } from './setup.constants';
//import dtos
import { DatabaseConnectionDto, SaveSetupDto } from './setup.dto';
//import services
import { JsonService } from 'src/config/json/json.service';
import { DatabaseService } from 'src/database/database.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    READ_METHOD,                  //read()
    POSTGRESCONNECTTEST_METHOD,   //postgreConnectTest()
    MONGOCONNECTTEST_METHOD,      //mongoConnectTest()
    SAVE_METHOD,                  //save()
} = SERVICE;

@Injectable()
export class SetupService {
    constructor(
        private readonly jsonService: JsonService,
        private readonly databaseService: DatabaseService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(SetupService.name);
    };

    async read(): Promise<string> {
        try {
            this.logger.serviceDebug(READ_METHOD);
            return await this.jsonService.readAll();
        } catch (err) {
            throw err;
        };
    };

    async postgreConnectTest(data: DatabaseConnectionDto): Promise<object> {
        try {
            this.logger.debug(POSTGRESCONNECTTEST_METHOD);
            return await this.databaseService.testPostgresConnection(data);
        } catch (err) {
            throw err;
        };
    };

    async mongoConnectTest(data: DatabaseConnectionDto): Promise<object> {
        try {
            this.logger.debug(MONGOCONNECTTEST_METHOD);
            return this.databaseService.testMongoConnection(data);
        } catch (err) {
            throw err;
        };
    };

    async save(data: SaveSetupDto): Promise<string> {
        try {
            this.logger.debug(SAVE_METHOD);
            await this.jsonService.save(data);
            try {
                await this.restart();
            } catch (err) {
                return 'pm2 not working';
            };
        } catch (err) {
            throw err;
        };
        // should call restart server
        this.restart();
    };

    async restart() {
        pm2.connect(err => {
            if (err) {
                console.log(err);
                process.exit(2);
            };
            pm2.start({
                script: 'dist/main.js',
                name: 'server',
            }, (err, apps) => {
                if (err) {
                    console.error(err);
                    return pm2.disconnect();
                };

                pm2.list((err, list) => {
                    console.log(err, list);

                    pm2.restart('server', (err, proc) => {
                        pm2.disconnect();
                    });
                });
            });
        });
    };
};