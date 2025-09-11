import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";

import { AuthTokenType } from "../api/auth-token-type";
import { AuthUser } from "../api/auth-user";
import { Credentials } from "../api/credentials";
import { RefreshTokenService } from "./refresh-token.service";
import { TokenStoreService } from "./token-store.service";
import { API_CONFIG, IApiConfig } from "../api/api.config";
import { BASE_URL } from '../api/base-url';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authStatusSource = new BehaviorSubject<boolean>(false);
    authStatus$ = this.authStatusSource.asObservable();

    baseUrl = inject(BASE_URL);
    apiConfig = inject<IApiConfig>(API_CONFIG);

    constructor(
        private http: HttpClient,
        private router: Router,
        private tokenStoreService: TokenStoreService,
        private refreshTokenService: RefreshTokenService
    ) {
        this.updateStatusOnPageRefresh();
        this.refreshTokenService.scheduleRefreshToken(this.isAuthUserLoggedIn(), false);
    }

    login(credentials: Credentials): Observable<boolean> {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this.http
            .post(`${this.baseUrl}api/${this.apiConfig.loginPath}`,
                credentials, { headers: headers })
            .pipe(
                map((response: any) => {
                    this.tokenStoreService.setRememberMe(credentials.rememberMe);
                    if (!response) {
                        console.error("There is no `{'" + this.apiConfig.accessTokenObjectKey +
                            "':'...','" + this.apiConfig.refreshTokenObjectKey + "':'...value...'}` response after login.");
                        this.authStatusSource.next(false);
                        return false;
                    }
                    this.tokenStoreService.storeLoginSession(response);
                    console.log("Logged-in user info", this.getAuthUser());
                    this.refreshTokenService.scheduleRefreshToken(true, true);
                    this.authStatusSource.next(true);
                    return true;
                }),
                catchError((error: HttpErrorResponse) => throwError(() => error))
            );
    }

    getBearerAuthHeader(): HttpHeaders {
        return new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken)}`
        });
    }

    logout(navigateToHome: boolean): void {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        const refreshToken = encodeURIComponent(this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken));
        this.http
            .get(`${this.baseUrl}api/${this.apiConfig.logoutPath}?refreshToken=${refreshToken}`,
                { headers: headers })
            .pipe(
                map(response => response || {}),
                catchError((error: HttpErrorResponse) => throwError(() => error)),
                finalize(() => {
                    this.tokenStoreService.deleteAuthTokens();
                    this.refreshTokenService.unscheduleRefreshToken(true);
                    this.authStatusSource.next(false);
                    if (navigateToHome) {
                        this.router.navigate(["/"]);
                    }
                }))
            .subscribe(result => {
                console.log("logout", result);
            });
    }

    isAuthUserLoggedIn(): boolean {
        return this.tokenStoreService.hasStoredAccessAndRefreshTokens() &&
            !this.tokenStoreService.isAccessTokenTokenExpired();
    }

    getAuthUser(): AuthUser | null {
        if (!this.isAuthUserLoggedIn()) {
            return null;
        }

        const decodedToken = this.tokenStoreService.getDecodedAccessToken();
        const roles = this.tokenStoreService.getDecodedTokenRoles();
        return Object.freeze({
            userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
            userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            displayName: decodedToken["DisplayName"],
            roles: roles
        });
    }

    isAuthUserInRoles(requiredRoles: string[]): boolean {
        const user = this.getAuthUser();
        if (!user || !user.roles) {
            return false;
        }

        //if (user.roles.indexOf(this.apiConfigService.configuration.adminRoleName.toLowerCase()) >= 0) {
        //  return true; // The `Admin` role has full access to every pages.
        //}

        return requiredRoles.some(requiredRole => {
            if (user.roles) {
                return user.roles.indexOf(requiredRole.toLowerCase()) >= 0;
            } else {
                return false;
            }
        });
    }

    isAuthUserInRole(requiredRole: string): boolean {
        return this.isAuthUserInRoles([requiredRole]);
    }

    private updateStatusOnPageRefresh(): void {
        this.authStatusSource.next(this.isAuthUserLoggedIn());
    }
}
