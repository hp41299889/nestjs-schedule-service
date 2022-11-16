//import packages
import { Injectable, Render } from "@nestjs/common";

@Injectable()
export class RoutesService {

    @Render('Schedule')
    schedule() {
        return;
    };

    @Render('Monitor')
    monitor() {
        return;
    };

    @Render('ExecutionLog')
    executionLog() {
        return;
    };

    @Render('Setup')
    setup() {
        return;
    };

    @Render('Auth')
    auth() {
        return;
    };
};