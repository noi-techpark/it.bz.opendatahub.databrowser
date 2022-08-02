import { RouteLocationRaw } from 'vue-router';
import { PropertyConfig } from '../../datasetConfig/types';

export interface Category {
  name: string;
  slug: string;
  to: RouteLocationRaw;
  isAnyFieldRequired?: boolean;
}

export interface SubCategory {
  name: string;
  properties: PropertyConfig[];
}
