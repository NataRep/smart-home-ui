import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenStorageService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = tokenService.getToken();

  if (state.url.includes('/login')) {
    if (token) {
      return router.createUrlTree(['/dashboard']);
    }
    return true;
  }

  if (token) {
    return authService.loadProfile().pipe(
      map(() => true),
      catchError(() => {
        tokenService.clearToken();
        return of(router.createUrlTree(['/login']));
      })
    );
  }

  return router.createUrlTree(['/login']);
};