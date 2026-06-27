import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const loaderService: LoaderService = inject(LoaderService);

  loaderService.showSpinner();

  return next(req).pipe(
    finalize(() => loaderService.hideSpinner())
  );
};