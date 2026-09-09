import { HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService: AuthService = inject(AuthService);
  const accessToken: string | null = authService.getToken('accessToken');

  if (!accessToken) {
    return next(request);
  }

  const authenticatedRequest: HttpRequest<unknown> = addAuthHeader(request, accessToken);

  return next(authenticatedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refresh().pipe(
          switchMap(() => {
            const newToken: string | null = authService.getToken('accessToken');
            const retryRequest: HttpRequest<unknown> = addAuthHeader(request, newToken!);
            return next(retryRequest);
          })
        );
      }
      return throwError(() => error);
    })
  );

};

function addAuthHeader(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${ token }`
    }
  });
  
}