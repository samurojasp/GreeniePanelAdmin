import { ContributionFile, ContributionLink } from '../../types';

export interface PostContributionBody {
  uuid: string;
  description: string;
  links: ContributionLink[];
  file: ContributionFile[];
  categoryId: number;
  indicatorID: number;
  files: File[];
}

export interface PatchContributionBody {
  description: string;
  links: ContributionLink[];
  file: ContributionFile[];
  categoryId: number;
  indicatorID: number;
  files: File[];
}
