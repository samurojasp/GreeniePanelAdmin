const adminNavBarItems = [
  {
    name: 'Dashboard',
    url: 'https://app.powerbi.com/links/ggDtE660sI?ctid=29a18182-402d-4ca9-a51f-2a356c6efdb7&pbi_source=linkShare',
    target: '_blank',
    badge: {
      text: 'PowerBI',
      color: '#1e4034',
    },
    iconComponent: { name: 'cilSpeedometer' },
  },
  {
    name: 'Matriz',
    url: '/matrix',
    iconComponent: { name: 'cil-home' },
  },
  {
    title: true,
    name: 'Gestión',
  },
  {
    name: 'Departamentos',
    url: '/departments',
    iconComponent: { name: 'cilPeople' },
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
    iconComponent: { name: 'cilPaperclip' },
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
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Añadir',
        url: '/addcategories',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Usuarios',
    iconComponent: { name: 'cilUser' },
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
    iconComponent: { name: 'cilTask' },
    url: '/contributions',
    children: [
      {
        name: 'Listado',
        url: '/contributions',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Añadir',
        url: '/create-contribution',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Ajustes',
    url: '/settings',
    iconComponent: { name: 'cil-settings' },
  },
];

const departmentNavBarItems = [
  {
    name: 'Matriz',
    url: '/matrix',
    iconComponent: { name: 'cil-home' },
  },
  {
    title: true,
    name: '',
  },
  {
    name: 'Aportes',
    iconComponent: { name: 'cilTask' },
    url: '/contributions',
    children: [
      {
        name: 'Listado',
        url: '/contributions',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Añadir',
        url: '/create-contribution',
        icon: 'nav-icon-bullet',
      },
    ],
  },
];

export const navItemsByRole = {
  admin: adminNavBarItems,
  dpto: departmentNavBarItems,
};
