import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthTokenType } from '../api/auth-token-type';
import { TokenStoreService } from '../jwt/token-store.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const tokenStoreService = inject(TokenStoreService);
    const router = inject(Router);
    const authorizationHeader = 'Authorization';

    const accessToken = tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken);
        
    const getNewAuthRequest = (request: HttpRequest<any>): HttpRequest<any> | null => {
        const newStoredToken = tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken);
        const requestAccessTokenHeader = request.headers.get(authorizationHeader);
        if (!newStoredToken || !requestAccessTokenHeader) {
          console.log("There is no new AccessToken.", { requestAccessTokenHeader: requestAccessTokenHeader, newStoredToken: newStoredToken });
          return null;
        }
        const newAccessTokenHeader = `Bearer ${newStoredToken}`;
        if (requestAccessTokenHeader === newAccessTokenHeader) {
          console.log("There is no new AccessToken.", { requestAccessTokenHeader: requestAccessTokenHeader, newAccessTokenHeader: newAccessTokenHeader });
          return null;
        }
        return request.clone({ headers: request.headers.set(authorizationHeader, newAccessTokenHeader) });
    }

    if (accessToken) {
        req = req.clone({
            headers: req.headers.set(authorizationHeader, `Bearer ${accessToken}`)
        });

        return next(req).pipe(
            catchError((error: any, caught: Observable<HttpEvent<unknown>>) => {
                console.error({ error, caught });

                if (error.status === 401 || error.status === 403) {
                    const newRequest = getNewAuthRequest(req);
                    if (newRequest) {
                        console.log("Try new AuthRequest ...");
                        return next(newRequest);
                    }
                    router.navigate(["/access-denied"]); //, { queryParams: { returnUrl: returnUrl } });
                }

                return throwError(() => error);
            })
        );
    }

    // login page
    return next(req);
}
