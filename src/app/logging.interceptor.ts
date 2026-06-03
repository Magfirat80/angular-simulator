import { HttpEvent, HttpRequest, HttpHandlerFn, HttpResponse, type HttpErrorResponse } from '@angular/common/http';
import { tap, Observable, catchError, throwError } from 'rxjs';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
  const startTime: number = Date.now();
  const requestInfo: string = `${ req.method } ${ req.urlWithParams }`;

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const duration: number = Math.round(Date.now() - startTime);
        console.log('[HTTP Done]', requestInfo, `status: ${ event.status }`, `duration: ${ duration } ms`);
      }
    }),
    catchError((err: HttpErrorResponse): Observable<never> => {
      const duration: number = Math.round(Date.now() - startTime);
      console.log('[HTTP Error]', requestInfo, `duration: ${ duration } ms`, err);
      return throwError(() => err);
    })
  );
};