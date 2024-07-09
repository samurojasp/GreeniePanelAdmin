import { Routes } from '@angular/router';
import { MatrixComponent } from './matrix.component';
export const routes: Routes = [
  {
    path: '',
    component: MatrixComponent,
    data: {
      title: 'Matrix',
    },
  },
];