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

    if (accessToken) {
        req = req.clone({
            headers: req.headers.set(authorizationHeader, `Bearer ${accessToken}`)
        });

        return next(req).pipe(
            catchError((error: any, caught: Observable<HttpEvent<unknown>>) => {
                console.error({ error, caught });

                if (error.status === 401 || error.status === 403) {
                    const newStoredToken = tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken);
                    const requestAccessTokenHeader = req.headers.get(authorizationHeader);

                    if (!newStoredToken || !requestAccessTokenHeader) {
                        console.log('There is no new AccessToken.', { requestAccessTokenHeader, newStoredToken });
                        router.navigate(['/accessDenied']);
                        return throwError(() => error);
                    }

                    const newAccessTokenHeader = `Bearer ${newStoredToken}`;
                    if (requestAccessTokenHeader === newAccessTokenHeader) {
                        console.log('No token refresh needed.', { requestAccessTokenHeader, newAccessTokenHeader });
                        router.navigate(['/accessDenied']);
                        return throwError(() => error);
                    }

                    const newRequest = req.clone({
                        headers: req.headers.set(authorizationHeader, newAccessTokenHeader)
                    });

                    console.log('Try new AuthRequest ...');
                    return next(newRequest);
                }

                return throwError(() => error);
            })
        );
    }

    return next(req);
}
