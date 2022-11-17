//import packages
import { Get, Controller, Render, Req, Res, Session, BadRequestException } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LoggerService } from 'src/common/logger/logger.service';

import { CONTROLLER } from './routes.constants';

const {
    SCHEDULE_VIEW_ROUTES,
    SCHEDULE_VIEW_FILE,
    MONITOR_VIEW_ROUTES,
    MONITOR_VIEW_FILE,
    EXECUTIONLOG_VIEW_ROUTES,
    EXECUTIONLOG_VIEW_FILE,
    SETUP_VIEW_ROUTES,
    SETUP_VIEW_FILE,
    AUTH_VIEW_ROUTES,
    AUTH_VIEW_FILE,
    REDIRECT_ROUTES
} = CONTROLLER;

@ApiExcludeController()
@Controller()
export class RoutesController {
    constructor(
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(RoutesController.name);
    };

    @Get(SCHEDULE_VIEW_ROUTES)
    @Render(SCHEDULE_VIEW_FILE)
    schedule(@Req() request: Request, @Res() response: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.controllerDebug(SCHEDULE_VIEW_ROUTES);
            if (session.visits) {
                return;
            } else {
                response.redirect(REDIRECT_ROUTES);
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Get(MONITOR_VIEW_ROUTES)
    @Render(MONITOR_VIEW_FILE)
    monitor(@Req() request: Request, @Res() response: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.controllerDebug(MONITOR_VIEW_ROUTES);
            if (session.visits) {
                return;
            } else {
                response.redirect(REDIRECT_ROUTES);
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Get(EXECUTIONLOG_VIEW_ROUTES)
    @Render(EXECUTIONLOG_VIEW_FILE)
    executionLog(@Req() request: Request, @Res() response: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.controllerDebug(EXECUTIONLOG_VIEW_ROUTES);
            if (session.visits) {
                return;
            } else {
                response.redirect(REDIRECT_ROUTES);
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Get(SETUP_VIEW_ROUTES)
    @Render(SETUP_VIEW_FILE)
    setup(@Req() request: Request, @Res() response: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.controllerDebug(SETUP_VIEW_ROUTES);
            if (session.visits) {
                return;
            } else {
                response.redirect(REDIRECT_ROUTES);
            };
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };

    @Get(AUTH_VIEW_ROUTES)
    @Render(AUTH_VIEW_FILE)
    auth() {
        try {
            this.logger.controllerDebug(AUTH_VIEW_ROUTES);
            return;
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };
};