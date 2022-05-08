import {
  NoViewConfig,
  PathParams,
  ViewConfig,
  ViewConfigWithPathParams,
} from '../types';

export type SourceType = 'embedded' | 'generated';

export interface SourceResult {
  viewConfig?: ViewConfig;
}

export type SourceResolver = (
  pathParams: PathParams
) => Promise<ViewConfig | NoViewConfig>;

export interface ViewConfigSource {
  source: SourceType;
  resolve: SourceResolver;
  getAllViewConfigs(): Promise<Record<string, ViewConfigWithPathParams[]>>;
}
