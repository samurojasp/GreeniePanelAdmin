export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  birthdate: string;
  role: string;
  department: {
    id: number;
    name: string;
  };
}

export interface Department {
  id: number;
  name: string;
  director: string;
  membersQuantity: number;
  categories: Category[];
}

export interface Indicator {
  id: number;
  name: string;
  englishName: string;
  index: number;
  description: string;
}

export interface Criterion {
  id: number;
  name: string;
  englishName: string;
  index: number;
  description: string;
  indicator: Indicator;
}

export interface ContributionLink {
  URL: string;
  description: string;
}

export interface ContributionFile {
  name: string;
  description: string;
  file: File | null;
}

export interface Contribution {
  uuid: string;
  description: string;
  categoryId: number;
  indicatorId: number;
  links: ContributionLink[];
  files: ContributionFile[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createAt: string;
  updateAt: string;
  deleteAt: string;
  indicator: Indicator;
  criteria: Criterion[];
}
export interface contribution {
  id: number;
  uuid: string;
  link: [
    {
      URL: string;
      description: string;
    }
  ];
  description: string;
  createAt: string;
  updateAt: string;
  files: [
    {
      id: number;
      name: string;
      description: string;
      path: string;
      type: string;
    }
  ];
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    department: {
      name: string;
      id: number;
    };
  };
  category: {
    id: number;
    name: string;
    description: string;
    indicator: {
      id: number;
      name: string;
      index: number;
      description: string;
    };
    criteria: [
      {
        id: number;
        name: string;
        index: number;
        description: string;
      }
    ];
  };
}

export interface Matrix {
  departmentName: string;
  categories: [
    {
      id: number;
      potencially: boolean;
      quantity: number;
    }
  ];
}

export interface BackendError {
  error: {
    status: number;
    instance: string;
    code: string;
    message: string;
    detail: [message: string] | string;
  };
}
