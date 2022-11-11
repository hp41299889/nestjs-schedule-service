import { Injectable, Logger } from '@nestjs/common';
import pm2, { restart } from 'pm2';

import { PostgreConnectTestSetupDto, MongoConnectTestSetupDto, SaveSetupDto } from './setup.dto';
import { JsonService } from 'src/config/json/json.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SetupService {
    constructor(
        private readonly jsonService: JsonService,
        private readonly databaseService: DatabaseService
    ) { };

    private readonly logger = new Logger(SetupService.name);

    read() {
        try {
            this.logger.debug('Calling jsonService.readAll()');
            return this.jsonService.readAll();
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    postgreConnectTest(data: PostgreConnectTestSetupDto) {
        try {
            this.logger.debug('Calling databaseService.testPostgresConnection()');
            return this.databaseService.testPostgresConnection(data);
        } catch (err) {
            return err;
        };
    };

    mongoConnectTest(data: MongoConnectTestSetupDto) {
        try {
            this.logger.debug('Calling databaseService.testMongoConnection()');
            return this.databaseService.testMongoConnection(data);
        } catch (err) {
            return err;
        };
    };

    async save(data: SaveSetupDto) {
        try {
            this.logger.debug('Calling jsonService.save()');
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