import { InjectionToken } from "@angular/core";

export const API_CONFIG = new InjectionToken<string>('API_CONFIG');

export interface IApiConfig {
    loginPath: string;
    logoutPath: string;
    refreshTokenPath: string;
    accessTokenObjectKey: string;
    refreshTokenObjectKey: string;
}

export const ApiConfig: IApiConfig = {
    loginPath: 'account/login',
    logoutPath: 'account/logout',
    refreshTokenPath: 'account/refreshToken',
    accessTokenObjectKey: 'access_token',
    refreshTokenObjectKey: 'refresh_token'
};