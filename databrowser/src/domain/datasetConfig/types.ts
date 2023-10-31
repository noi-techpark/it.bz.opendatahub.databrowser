// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfigSource } from './loader/types';
import { DomainWithOpenApiDocument } from '../openApi/types';

interface BasePropertyConfig {
  title: string;
  component: string;
  params?: Record<string, string>;
  class?: string;
  tooltip?: string;
  required?: boolean;
}

export interface ObjectPropertyConfig {
  fields: Record<string, string>;
  listFields?: never;
}

export interface BaseListFields {
  pathToParent: string;
  // If fields is undefined or empty, then the object defined by parentPath
  // is passed to the component as it is. This is useful e.g. for an array
  // of simple types (strings, number or booleans)
  fields?: Record<string, string>;
}

export interface ArrayPropertyConfig {
  fields?: never;
  listFields: BaseListFields & { attributeName: string };
}

export type PropertyConfig = (ObjectPropertyConfig | ArrayPropertyConfig) &
  BasePropertyConfig;

export interface FilterConfig {
  name: string;
  component: string;
  params?: Record<string, unknown>;
}

export type ListElements = PropertyConfig & {
  // Any entry from the fields property of the object
  field?: string;
};

export interface SubCategoryElement {
  name: string;
  properties: PropertyConfig[];
}

export interface DetailElements {
  name: string;
  slug: string;
  subcategories: SubCategoryElement[];
}

export type QuickViewElements = Omit<
  PropertyConfig,
  'title' | 'class' | 'required' | 'tooltip'
>;

export interface EditElements {
  name: string;
  slug: string;
  subcategories: {
    name: string;
    properties: (PropertyConfig & {
      reference?: {
        url: string;
        labelSelector: string;
        keySelector: string;
      };
    })[];
  }[];
}

export type PathParams = string[];

export interface DatasetRoute {
  domain: DatasetDomain;
  pathParams: PathParams;
  id?: string;
}

export interface DatasetDescription {
  title?: string;
  subtitle?: string;
  description?: string;
}

export interface TableViewElements {
  elements: ListElements[];
}
export interface DetailViewElements {
  elements: DetailElements[];
}
export interface QuickViewPageConfig {
  topGallery?: QuickViewTopGallery;
  elements: QuickViewElements[];
}

export interface QuickViewTopGallery {
  isVisible: boolean;
  fields: Record<string, string>;
}
export interface EditViewElements {
  elements: EditElements[];
}

export type WithDefaultQueryParams = {
  defaultQueryParams?: Record<string, string>;
};

export type ListViewConfig = TableViewElements & WithDefaultQueryParams;
export type DetailViewConfig = DetailViewElements & WithDefaultQueryParams;
export type QuickViewConfig = QuickViewPageConfig & WithDefaultQueryParams;
export type EditViewConfig = EditViewElements & WithDefaultQueryParams;
export type RawViewConfig = WithDefaultQueryParams;
export type NewViewConfig = EditViewElements & WithDefaultQueryParams;

export type ViewConfig =
  | ListViewConfig
  | DetailViewConfig
  | EditViewConfig
  | NewViewConfig
  | QuickViewConfig
  | RawViewConfig;

export interface Operation {
  rolesAllowed: string[];
}

export interface DatasetConfig {
  source: DatasetConfigSource;
  baseUrl: string;
  route: DatasetRoute;
  description: DatasetDescription;
  views?: {
    detail?: DetailViewConfig;
    edit?: EditViewConfig;
    new?: NewViewConfig;
    quick?: QuickViewConfig;
    raw?: RawViewConfig;
    table?: ListViewConfig;
  };
  operations?: {
    readAll?: Operation;
    read?: Operation;
    create?: Operation;
    update?: Operation;
    delete?: Operation;
  };
}

export type ViewKey = keyof Required<DatasetConfig>['views'];

export type ViewValue = Required<DatasetConfig>['views'];

export type ViewFlags = Record<`is${Capitalize<ViewKey>}View`, boolean>;

export type OperationKey = keyof Required<DatasetConfig>['operations'];

export type Operations = NonNullable<DatasetConfig['operations']>;

export type Domain = string;

export type DatasetDomain =
  | DomainWithOpenApiDocument
  // In case there is a URL parameter for the domain, but the domain is not known
  | 'unknown'
  // In case the current URL is not related to datasets
  | 'no-dataset-domain-in-url';

export interface DatasetPath {
  pathParams: string[];
  pathId?: string;
}

export interface DatasetLocation extends DatasetPath {
  domain: DatasetDomain;
}

export type CandidateConfig = {
  rank: number;
  config: DatasetConfig;
};
