import { HttpEvent, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { APP_CONFIG } from '../tokens/app-config.token';
import { IAppConfig } from '../interfaces/IAppConfig';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
  const config: IAppConfig = inject(APP_CONFIG);

  if (!config.enableLogs) {
  return next(req);
  }
  
  const startTime: number = Date.now();
  const requestInfo = `${ req.method } ${ req.urlWithParams }`;

  console.warn('[HTTP Request]', requestInfo);

  return next(req).pipe(
    catchError((err: HttpErrorResponse): Observable<never> => {
      const duration: number = Math.round(Date.now() - startTime);
      
      console.error('[HTTP Error]', requestInfo, `duration: ${ duration } ms`, err);
      return throwError(() => err);
    })
  );
};