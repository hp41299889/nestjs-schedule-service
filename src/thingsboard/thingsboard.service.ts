import { Injectable, ForbiddenException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable, lastValueFrom } from 'rxjs';
import { JWTToken } from './interface';

@Injectable()
export class ThingsboardService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {

    };

    private readonly username = this.configService.get("THINGSBOARD_USERNAME") || "dannylu1029@gmail.com";
    private readonly password = this.configService.get("THINGSBOARD_PASSWORD") || "roxy1029";
    private readonly host = this.configService.get("THINGSBOARD_HOST") || "192.168.35.100";
    private readonly port = this.configService.get("THINGSBOARD_PORT") || "8080";
    private readonly deviceId = this.configService.get("THINGSBOARD_DEVICE_ID") || "da97fdb0-3e16-11ed-b4b6-ef3c210e8022";
    private readonly baseUrl = `http://${this.host}:${this.port}/api`;

    async getJWTToken(): Promise<Observable<JWTToken>> {
        const requestUrl = `${this.baseUrl}/auth/login`;
        const requestData = {
            "username": this.username,
            "password": this.password
        };
        const requestConfig = {
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        const request = this.httpService
            .post(requestUrl, requestData, requestConfig)
            .pipe(map(res => res.data))
            .pipe(
                catchError(() => {
                    throw new ForbiddenException("getJWTToken error");
                })
            );
        //lastValueFrom() is use to get data from Observable

        const response = await lastValueFrom(request);

        return response;
    };

    async getAttributes(): Promise<Observable<Array<object>>> {
        const JWTToken = await this.getJWTToken();
        const requestUrl = `${this.baseUrl}/plugins/telemetry/DEVICE/${this.deviceId}/values/attributes/SERVER_SCOPE`;
        const requestConfig = {
            "headers": {
                "Authorization": `Bearer ${JWTToken}`,
                "Content-Type": "application/json",
            }
        };

        const request = this.httpService
            .get(requestUrl, requestConfig)
            .pipe(map(res => res.data))
            .pipe(
                catchError(() => {
                    throw new ForbiddenException("getAttributes error");
                })
            )

        const response = await lastValueFrom(request);

        return response;
    };
};