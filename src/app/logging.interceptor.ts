import { HttpEvent, HttpRequest, HttpHandlerFn, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap, Observable } from 'rxjs';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
  const startTime: number = Date.now();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const duration: number = Math.round(Date.now() - startTime);
          console.log('[HTTP Done]', req.method, req.urlWithParams, `status: ${ event.status }`, `duration: ${ duration } ms`);
        }
      },
      error: (err) => {
        const duration: number = Math.round(Date.now() - startTime);
        console.log('[HTTP Error]', req.method, req.urlWithParams, `duration: ${ duration } ms`, err);
      }
    })
  );
};