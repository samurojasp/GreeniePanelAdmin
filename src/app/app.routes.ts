import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from './auth.guard';
export const routes: Routes = [
  {
    path: 'auth/login',
    loadChildren: () =>
      import('./views/auth/login/routes').then((m) => m.routes),
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'matrix',
        loadChildren: () =>
          import('./views/matrix/routes').then((m) => m.routes),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./views/categories/list-categories/routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'addcategories',
        loadChildren: () =>
          import('./views/categories/add-categorie/routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'editcategories/:id',
        loadChildren: () =>
          import('./views/categories/edit-categorie/routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./views/users/list-users/routes').then((m) => m.routes),
      },
      {
        path: 'addusers',
        loadChildren: () =>
          import('./views/users/add-user/routes').then((m) => m.routes),
      },
      {
        path: 'editusers/:id',
        loadChildren: () =>
          import('./views/users/edit-user/routes').then((m) => m.routes),
      },
      {
        path: 'contributions/category/:CategoryID/indicator/:IndicatorID',
        loadChildren: () =>
          import('./views/contributions/list/routes').then((m) => m.routes),
      },
      {
        path: 'contributions/category/:CategoryID',
        loadChildren: () =>
          import('./views/contributions/list/routes').then((m) => m.routes),
      },
      {
        path: 'contributions/indicator/:IndicatorID',
        loadChildren: () =>
          import('./views/contributions/list/routes').then((m) => m.routes),
      },
      {
        path: 'contributions',
        loadChildren: () =>
          import('./views/contributions/list/routes').then((m) => m.routes),
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('./views/departments/list/routes').then((m) => m.routes),
      },
      {
        path: 'create-department',
        loadChildren: () =>
          import('./views/departments/create/routes').then((m) => m.routes),
      },
      {
        path: 'edit-department/:id',
        loadChildren: () =>
          import('./views/departments/edit/routes').then((m) => m.routes),
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('./views/departments/list/routes').then((m) => m.routes),
      },
      {
        path: 'create-contribution',
        loadChildren: () =>
          import('./views/contributions/create/routes').then((m) => m.routes),
      },
      {
        path: 'edit-contribution/:id',
        loadChildren: () =>
          import('./views/contributions/edit/routes').then((m) => m.routes),
      },
      {
        path: 'criteria',
        loadChildren: () =>
          import('./views/criteria/list/routes').then((m) => m.routes),
      },
      {
        path: 'create-criterion',
        loadChildren: () =>
          import('./views/criteria/create/routes').then((m) => m.routes),
      },
      {
        path: 'edit-criterion/:id',
        loadChildren: () =>
          import('./views/criteria/edit/routes').then((m) => m.routes),
      },
      {
        path: 'indicators',
        loadChildren: () =>
          import('./views/indicators/list-indicators/routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'addIndicators',
        loadChildren: () =>
          import('./views/indicators/add-indicator/routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'editIndicators/:id',
        loadChildren: () =>
          import('./views/indicators/edit-indicator/routes').then(
            (m) => m.routes
          ),
      },
      {
        path: '**',
        loadChildren: () =>
          import('./views/pages/page404/routes').then((m) => m.routes),
      },
    ],
  },
];
