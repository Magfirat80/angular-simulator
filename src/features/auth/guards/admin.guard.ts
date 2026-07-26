import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IAuthResponse } from '../interfaces/IAuthResponse';

export const adminGuard: CanActivateFn = () => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const user: IAuthResponse | null = authService.getCurrentUser();

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  return user.role === 'admin'
    ? true
    : router.createUrlTree(['/home']);

};