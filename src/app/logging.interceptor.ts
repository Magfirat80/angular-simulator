import { HttpEvent, HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { tap, Observable, catchError, throwError } from 'rxjs';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
  const startTime: number = Date.now();
  const requestInfo: string = `${ req.method } ${ req.urlWithParams }`;

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        const duration: number = Math.round(Date.now() - startTime);
        console.log('[HTTP Done]', requestInfo, `status: ${ event.status }`, `duration: ${ duration } ms`);
      }
    }),
    catchError(err => {
      const duration: number = Math.round(Date.now() - startTime);
      console.log('[HTTP Error]', requestInfo, `duration: ${ duration } ms`, err);
      return throwError(() => err);
    })
  );
};