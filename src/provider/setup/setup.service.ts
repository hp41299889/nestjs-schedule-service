//import packages
import { Injectable, Logger } from '@nestjs/common';
import pm2, { restart } from 'pm2';

//import constants
import { SERVICE } from './setup.constants';
//import dtos
import { PostgreConnectTestSetupDto, MongoConnectTestSetupDto, SaveSetupDto } from './setup.dto';
//import services
import { JsonService } from 'src/config/json/json.service';
import { DatabaseService } from 'src/database/database.service';

const {
    DEBUG_MESSAGE,                  //
    DEBUG_MESSAGE_SUCCESS,          //
    READ_FUNCTION,                  //
    POSTGRESCONNECTTEST_FUNCTION,   //
    MONGOCONNECTTEST_FUNCTION,      //
    SAVE_FUNCTION,                  //
} = SERVICE;

@Injectable()
export class SetupService {
    constructor(
        private readonly jsonService: JsonService,
        private readonly databaseService: DatabaseService
    ) { };

    private readonly logger = new Logger(SetupService.name);

    read() {
        this.logger.debug(`${DEBUG_MESSAGE} ${READ_FUNCTION}`);
        try {
            return this.jsonService.readAll();
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    postgreConnectTest(data: PostgreConnectTestSetupDto) {
        this.logger.debug(`${DEBUG_MESSAGE} ${POSTGRESCONNECTTEST_FUNCTION}`);
        try {
            return this.databaseService.testPostgresConnection(data);
        } catch (err) {
            return err;
        };
    };

    mongoConnectTest(data: MongoConnectTestSetupDto) {
        this.logger.debug(`${DEBUG_MESSAGE} ${MONGOCONNECTTEST_FUNCTION}`);
        try {
            return this.databaseService.testMongoConnection(data);
        } catch (err) {
            return err;
        };
    };

    async save(data: SaveSetupDto) {
        this.logger.debug(`${DEBUG_MESSAGE} ${SAVE_FUNCTION}`);
        try {
            await this.jsonService.save(data);
            try {
                await this.restart();
            } catch (err) {
                return 'pm2 not working';
            };
        } catch (err) {
            this.logger.error(err);
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