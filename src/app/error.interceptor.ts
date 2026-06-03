import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { MessageService } from '../services/message.service';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const messageService: MessageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status >= 500 && error.status < 600) {
        messageService.showError(`Server error: ${ error.message }`);
      }
      return throwError(() => error);
    })
  );
};