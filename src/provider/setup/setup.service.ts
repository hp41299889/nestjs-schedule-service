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
    DEBUG_MESSAGE,                  //
    DEBUG_MESSAGE_SUCCESS,          //
    READ_METHOD,                  //
    POSTGRESCONNECTTEST_METHOD,   //
    MONGOCONNECTTEST_METHOD,      //
    SAVE_METHOD,                  //
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

    read() {
        try {
            this.logger.serviceDebug(READ_METHOD);
            return this.jsonService.readAll();
        } catch (err) {
            this.logger.errorMessage(err);
            return err;
        };
    };

    postgreConnectTest(data: DatabaseConnectionDto) {
        try {
            this.logger.debug(POSTGRESCONNECTTEST_METHOD);
            return this.databaseService.testPostgresConnection(data);
        } catch (err) {
            this.logger.errorMessage(err);
            return err;
        };
    };

    mongoConnectTest(data: DatabaseConnectionDto) {
        try {
            this.logger.debug(MONGOCONNECTTEST_METHOD);
            return this.databaseService.testMongoConnection(data);
        } catch (err) {
            this.logger.errorMessage(err);
            return err;
        };
    };

    async save(data: SaveSetupDto) {
        try {
            this.logger.debug(SAVE_METHOD);
            await this.jsonService.save(data);
            try {
                await this.restart();
            } catch (err) {
                return 'pm2 not working';
            };
        } catch (err) {
            this.logger.errorMessage(err);
            return err;
        };
        // should call restart server
        // this.restart();
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