import { ContributionFile, ContributionLink } from '../../types';

export interface ContributionBody {
  uuid: string;
  description: string;
  links: ContributionLink[];
  file: ContributionFile[];
  categoryId: number;
  indicatorID: number;
  files: File[];
}
