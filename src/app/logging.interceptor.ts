import { HttpEvent, HttpRequest, HttpHandlerFn, HttpEventType } from '@angular/common/http';
import { tap, Observable } from 'rxjs';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
  const startTime: number = Date.now();

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event.type === HttpEventType.Response) {
        const duration: number = Math.round(Date.now() - startTime);
        console.log('[HTTP Done]', req.method, req.urlWithParams, `status: ${ event.status }`, `duration: ${ duration } ms`);
      }
    })
  );
};