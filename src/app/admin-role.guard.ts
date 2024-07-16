import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminRoleGuard: CanActivateFn = () => {
  const router = inject(Router);
  const role = localStorage.getItem('role');
  console.log('entro en el guard');
  if (role !== 'admin') {
    router.navigate(['/']);
    return false;
  }

  return true;
};
