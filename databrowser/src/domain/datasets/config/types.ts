// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DomainWithOpenApiDocument } from '../../openApi/types';
import { MaybeRef } from 'vue';

interface BasePropertyConfig {
  title: string;
  component: string;
  params?: Record<string, string>;
  class?: string;
  tooltip?: string;
  required?: boolean;
}

/**
 * A property path is a string that represents the path to a property.
 *
 * For example the path to the property "name" of the object "person" is
 * "person.name".
 *
 * A PropertyPath may also contain placeholders for dynamic path parameters,
 * e.g. for the language. They are denoted by curly braces, e.g.:
 * "person.{language}.name"
 */
// TODO: should this rather be a string array? That would make it easier to
// parse and handle the path
export type PropertyPath = string;

/**
 * A target property name is a string that represents the name of a property
 * in the mapped object.
 */
export type TargetPropertyName = string;

export type ObjectMapping = Record<TargetPropertyName, PropertyPath>;

export interface ObjectPropertyConfig {
  objectMapping: ObjectMapping;
  arrayMapping?: never;
}

export interface ArrayMapping {
  // Name of the target attribute / property
  targetPropertyName: string;
  // Path to the parent object
  pathToParent: PropertyPath;
  // If objectMapping is undefined or empty, then the object defined by parentPath
  // is passed to the component as it is. This is useful e.g. for an array
  // of simple types (strings, number or booleans)
  objectMapping?: ObjectMapping;
}

export interface ArrayPropertyConfig {
  objectMapping?: never;
  arrayMapping: ArrayMapping;
}

export type PropertyConfig = (ObjectPropertyConfig | ArrayPropertyConfig) &
  BasePropertyConfig;

export interface FilterConfig {
  name: string;
  component: string;
  params?: Record<string, unknown>;
}

export type ListElements = PropertyConfig & {
  // Any entry from object mappings
  propertyPath?: string;
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
    properties: PropertyConfig[];
  }[];
}

export type PathSegments = string[];

export interface DatasetRoute {
  domain: DatasetDomain;
  pathSegments: PathSegments;
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
  objectMapping: ObjectMapping;
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

export type DatasetConfigSource = 'any' | 'embedded' | 'generated';

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

export type AnyDomain = string;

export type DatasetDomain =
  | DomainWithOpenApiDocument
  // In case there is a URL parameter for the domain, but the domain is not known
  | 'unknown'
  // In case the current URL is not related to datasets
  | 'no-dataset-domain-in-url';
export type DatasetPath = string[];
export type DatasetId = string;
export interface DatasetQuery {
  raw: Record<string, string | null | (string | null)[]>;
  stringified: Record<string, string>;
  default: Record<string, string>;
}

export interface DatasetLocation {
  // datasetDomain: DatasetDomain;
  datasetPath: DatasetPath;
  datasetQuery: DatasetQuery;
  // datasetId?: DatasetId;
  // The full path including base url, path, query and hash
  fullPath: string;
}

export type CandidateConfig = {
  rank: number;
  config: DatasetConfig;
};

export type RouteDomain = string | undefined;
export type RouteQuery = Record<string, string | null | (string | null)[]>;
export type RoutePath = string[];
export type RouteId = string | undefined;
export type RouteName = string | undefined;

export interface RouteLocation {
  routeDomain: RouteDomain;
  routePath: RoutePath;
  routeQuery: RouteQuery;
  routeId: RouteId;
  routeName: RouteName;
}

export type ToMaybeRefs<T = any> = {
  [K in keyof T]: MaybeRef<T[K]>;
};
