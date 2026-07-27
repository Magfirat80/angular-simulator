import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { UserRole } from '../enums/user-role.enum';

export const adminGuard: CanActivateFn = () => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const user: IAuthResponse | null = authService.getCurrentUser();

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  return user.role === UserRole.Admin
    ? true
    : router.createUrlTree(['/home']);

};