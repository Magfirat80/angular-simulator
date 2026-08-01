import { HttpEvent, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
  const startTime: number = Date.now();
  const requestInfo = `${ req.method } ${ req.urlWithParams }`;

  return next(req).pipe(
    catchError((err: HttpErrorResponse): Observable<never> => {
      const duration: number = Math.round(Date.now() - startTime);
      console.error('[HTTP Error]', requestInfo, `duration: ${ duration } ms`, err);
      return throwError(() => err);
    })
  );
};