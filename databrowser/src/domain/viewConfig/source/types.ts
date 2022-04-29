import { NoViewConfig, PathParams, ViewConfig } from '../types';

export type SourceType = 'embedded' | 'generated';

export interface SourceResult {
  viewConfig?: ViewConfig;
}

export type SourceResolver = (
  pathParams: PathParams
) => Promise<ViewConfig | NoViewConfig>;

export interface ViewConfigSource {
  source: SourceType;
  resolver: SourceResolver;
}
