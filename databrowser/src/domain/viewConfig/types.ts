import { SourceType } from './source/types';

export interface PropertyConfig {
  title: string;
  component: string;
  fields: Record<string, string>;
  params?: Record<string, string>;
  class?: string;
}

export interface FilterConfig {
  name: string;
  component: string;
  params?: Record<string, unknown>;
}

export interface ListElements extends PropertyConfig {
  filter?: FilterConfig;
}

export interface DetailElements {
  name: string;
  slug: string;
  subcategories: {
    name: string;
    properties: PropertyConfig[];
  }[];
}

export interface ViewRenderConfig {
  type: 'list' | 'detail';
}
export interface ListRenderConfig extends ViewRenderConfig {
  type: 'list';
  elements: ListElements[];
}

export interface DetailRenderConfig extends ViewRenderConfig {
  type: 'detail';
  elements: DetailElements[];
}

export interface ViewConfigDescription {
  title?: string;
  subtitle?: string;
  description?: string;
}

export interface ViewConfig {
  source: SourceType;
  baseUrl: string;
  path: string;
  renderConfig: ListRenderConfig | DetailRenderConfig;
  description?: ViewConfigDescription;
}

export interface NoViewConfig {
  reason: string;
}

export type ResolvedViewConfig = ViewConfig | NoViewConfig;

export interface ViewConfigWithPathParams {
  pathParams: PathParams;
  viewConfig: ViewConfig;
}

export interface ResolvedViewConfigWithPathParams {
  pathParams: PathParams;
  viewConfig: ResolvedViewConfig;
}

export type PathParams = string[];
