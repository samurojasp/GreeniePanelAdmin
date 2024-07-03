import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';

export const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    data: {
      title: 'Lista de Categorías'
    }
  }
];
