import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Matriz',
    url: '/matrix',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Gestión',
    class: 'mt-auto',
  },
  {
    name: 'Departamentos',
    url: '/departments',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Listado',
        url: '/departments',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Añadir',
        url: '/create-department',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Indicadores',
    iconComponent: { name: 'cil-chart' },
    url: '/indicators',
    children: [
      {
        name: 'Listado',
        url: '/indicators',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Añadir',
        url: '/addIndicators',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Criterios',
    url: '/criteria',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Listado',
        url: '/criteria',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Añadir',
        url: '/create-criterion',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Categorias',
    iconComponent: { name: 'cil-spreadsheet' },
    url: '/categories',
    children: [
      {
        name: 'Listado',
        url: '/categories',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Agregar Categorias',
        url: '/addcategories',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Usuarios',
    iconComponent: { name: 'cilPeople' },
    url: '/users',
    children: [
      {
        name: 'Listado',
        url: '/users',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Añadir',
        url: '/addusers',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Aportes',
    iconComponent: { name: 'cil-star' },
    url: '/contributions'
  },  
];
