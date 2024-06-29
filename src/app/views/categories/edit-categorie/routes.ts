import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./edit-categorie.component').then(m => m.EditCategorieComponent),
    data: {
      title: $localize`editcategories`
    }
  }
];