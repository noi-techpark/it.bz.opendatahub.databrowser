import { RouteLocationRaw } from 'vue-router';
import { PropertyConfig } from '../../datasetConfig/types';

export type PropertyConfigWithErrors = PropertyConfig & {
  errors?: string[];
};

export interface Category {
  name: string;
  slug: string;
  to: RouteLocationRaw;
  subCategories: SubCategory[];
  isAnyFieldRequired?: boolean;
  isAnyFieldError?: boolean;
}

export interface SubCategory {
  name: string;
  properties: PropertyConfigWithErrors[];
}
