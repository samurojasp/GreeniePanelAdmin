export interface Department {
  id: number;
  name: string;
  director: string;
  membersQuantity: number;
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
