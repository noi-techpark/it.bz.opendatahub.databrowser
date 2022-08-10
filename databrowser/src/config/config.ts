import { DatasetConfig, DatasetDomain } from '../domain/datasetConfig/types';
import {
  accommodationConfig,
  articleConfig,
  eventShortConfig,
  odhActivityPoiConfig,
  odhActivityPoiTypesConfig,
  gastronomyConfig,
  weinkellereienConfig,
  venueConfig,


} from './tourism';

type EmbeddedDatasetConfigs = Record<
  DatasetDomain,
  Record<string, DatasetConfig>
>;

const datasetConfigs = [
  accommodationConfig,
  articleConfig,
  eventShortConfig,
  odhActivityPoiConfig,
  odhActivityPoiTypesConfig,
  gastronomyConfig,
  weinkellereienConfig,
  venueConfig,
 
];

const computeEmbeddedDatasetConfigs = (): EmbeddedDatasetConfigs => {
  return datasetConfigs.reduce<EmbeddedDatasetConfigs>((previous, current) => {
    const configsForDomain = { ...previous[current.route.domain] } ?? {};
    const path = '/' + current.route.pathParams.join('/');
    configsForDomain[path] = current;
    return { ...previous, [current.route.domain]: configsForDomain };
  }, {});
};

export const embeddedDatasetConfigs = computeEmbeddedDatasetConfigs();

export const findEmbeddedDatasetConfig = (
  domain: string,
  path: string
): DatasetConfig | undefined => embeddedDatasetConfigs[domain]?.[path];
