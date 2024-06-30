import { Routes } from '@angular/router';
import { ContributionsComponent } from './contributions.component';
export const routes: Routes = [
  {
    path: '',
    component: ContributionsComponent,
    data: {
      title: 'Contributions',
    },
  },
];
