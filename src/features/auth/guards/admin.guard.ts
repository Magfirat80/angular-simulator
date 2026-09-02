import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../enums/userRole';
import { IUser } from '../interfaces/IUser';

export const adminGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const user: IUser | null = authService.getCurrentUser();

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  return user.role === UserRole.ADMIN ? true : router.createUrlTree(['/home']);
};