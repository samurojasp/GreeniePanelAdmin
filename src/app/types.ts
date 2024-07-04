export interface Department {
  id: number;
  name: string;
  director: string;
  membersQuantity: number;
  categorie: Categorie;
}

export interface Indicator {
  id: number;
  name: string;
  index: number;
  description: string;
}

export interface Criterion {
  id: number;
  name: string;
  index: number;
  description: string;
  indicator: Indicator;
}

export interface Categorie {
  id: number;
  name: string;
  indicator: {
    id: number;
    name: string;
  };
  description: string;
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
