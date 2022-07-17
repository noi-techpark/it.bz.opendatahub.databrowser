import { DatasetConfig, DatasetDomain, DatasetRoute } from '../types';

export type SourceType = 'embedded' | 'generated';

export interface SourceResult {
  config?: DatasetConfig;
}

export type SourceResolver = (
  datasetRoute: DatasetRoute
) => Promise<DatasetConfig>;

export interface DatasetConfigSource {
  source: SourceType;
  resolve: SourceResolver;
  getAllDatasetConfigs(): Promise<Record<DatasetDomain, DatasetConfig[]>>;
}
