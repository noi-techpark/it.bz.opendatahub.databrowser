import { RouteLocationRaw } from 'vue-router';
import { PropertyConfig } from '../../datasetConfig/types';

export interface DetailCategory {
  name: string;
  slug: string;
  to: RouteLocationRaw;
}

export interface DetailSubCategory {
  name: string;
  properties: PropertyConfig[];
}
