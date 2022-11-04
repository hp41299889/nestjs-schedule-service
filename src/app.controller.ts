import { Get, Controller, Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
    @Get('/Schedule/view')
    @Render('Schedule')
    schedule() {
        return;
    };

    @Get('/Monitor/view')
    @Render('Monitor')
    monitor() {
        return;
    };

    @Get('/ExecutionLog/view')
    @Render('ExecutionLog')
    executionLog() {
        return;
    };

    @Get('/Setup/view')
    @Render('Setup')
    setup() {
        return;
    };

    @Get('/Auth/view')
    @Render('Auth')
    auth() {
        return;
    };
}