import { HttpEvent, HttpRequest, HttpHandlerFn, HttpXsrfTokenExtractor } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap, finalize } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';

export function xsrfInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const tokenExtractor = inject(HttpXsrfTokenExtractor);
  const loader = inject(LoadingBarService);

  if (req.method === 'POST') {
    const headerName = 'X-XSRF-TOKEN';
    const token = tokenExtractor.getToken();
    if (token && !req.headers.has(headerName)) {
      req = req.clone({
        headers: req.headers.set(headerName, token),
      });
    }
  }

  let started = false;
  const ref = loader.useRef('http');

  return next(req).pipe(
    tap(() => {
      if (!started) {
        ref.start();
        started = true;
      }
    }),
    finalize(() => {
      if (started) {
        ref.complete();
      }
    })
  );
}