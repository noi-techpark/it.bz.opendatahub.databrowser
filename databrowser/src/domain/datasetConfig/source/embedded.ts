import {
  embeddedDatasetConfigs,
  findEmbeddedDatasetConfig,
} from '../../../config/config';
import { DatasetConfig, DatasetDomain } from '../types';
import { DatasetConfigSource, SourceResolver } from './types';

const sourceResolver: SourceResolver = async (datasetRoute) => {
  const path = '/' + datasetRoute.pathParams.join('/');
  const config = findEmbeddedDatasetConfig(datasetRoute.domain, path);

  if (config == null) {
    return Promise.reject(
      `No dataset config found for domain ${datasetRoute.domain} and path params ${datasetRoute.pathParams}`
    );
  }

  return Promise.resolve(config);
};

const getAllDatasetConfigs = async (): Promise<
  Record<DatasetDomain, DatasetConfig[]>
> => {
  return Object.keys(embeddedDatasetConfigs).reduce<
    Record<DatasetDomain, DatasetConfig[]>
  >(
    (previous, domain) => ({
      ...previous,
      [domain]: Object.values(embeddedDatasetConfigs[domain]),
    }),
    {}
  );
};

export const embeddedDatasetConfigSource: DatasetConfigSource = {
  source: 'embedded',
  resolve: sourceResolver,
  getAllDatasetConfigs,
};
