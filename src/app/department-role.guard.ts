import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const departmentRoleGuard: CanActivateFn = () => {
  const router = inject(Router);
  const role = localStorage.getItem('role');

  if (role !== 'dpto') {
    router.navigate(['/']);
    return false;
  }

  return true;
};
