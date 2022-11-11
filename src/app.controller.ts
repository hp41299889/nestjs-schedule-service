import { Get, Controller, Render, Req, Res, Session } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiExcludeController()
@Controller()
export class AppController {
    @Get('/Schedule/view')
    @Render('Schedule')
    schedule(@Req() request: Request, @Res() response: Response, @Session() session: Record<string, any>) {
        if (session.visits) {
            return;
        } else {
            response.redirect('../Auth/view');
        };
    };

    @Get('/Monitor/view')
    @Render('Monitor')
    monitor(@Req() request: Request, @Res() response: Response, @Session() session: Record<string, any>) {
        if (session.visits) {
            return;
        } else {
            response.redirect('../Auth/view');
        };
    };

    @Get('/ExecutionLog/view')
    @Render('ExecutionLog')
    executionLog(@Req() request: Request, @Res() response: Response, @Session() session: Record<string, any>) {
        if (session.visits) {
            return;
        } else {
            response.redirect('../Auth/view');
        };
    };

    @Get('/Setup/view')
    @Render('Setup')
    setup(@Req() request: Request, @Res() response: Response, @Session() session: Record<string, any>) {
        if (session.visits) {
            return;
        } else {
            response.redirect('../Auth/view');
        };
    };

    @Get('/Auth/view')
    @Render('Auth')
    auth() {
        return;
    };
}