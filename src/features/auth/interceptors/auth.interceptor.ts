import { HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { setAuthHeader } from './auth.utils';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const authService: AuthService = inject(AuthService);
  const accessToken: string | null = authService.getToken('accessToken');

  if (!accessToken) {
    return next(req);
  }

  const authReq: HttpRequest<unknown> = setAuthHeader(req, accessToken);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refresh().pipe(
          switchMap(() => {
            const newToken: string | null = authService.getToken('accessToken');
            const retryReq: HttpRequest<unknown> = setAuthHeader(req, newToken!);
            return next(retryReq);
          })
        );
      }
      return throwError(() => error);
    })
  );

};