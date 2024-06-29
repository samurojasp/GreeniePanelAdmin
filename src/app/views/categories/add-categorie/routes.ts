import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./add-categorie.component').then(m => m.AddCategorieComponent),
    data: {
      title: $localize`addcategories`
    }
  }
];