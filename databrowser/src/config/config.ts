import { DatasetConfig, DatasetDomain } from '../domain/datasetConfig/types';
import {
  accommodationConfig,
  articleConfig,
  eventShortConfig,
  odhActivityPoiConfig,
  odhActivityPoiTypesConfig,
  eventTopicsConfig,
  accommodationTypesConfig,
  webcamInfoConfig,
  wineAwardConfig,
  gastronomyConfig,
  venueConfig,
  weatherInfoConfig,
  municipalityConfig,
  districtConfig,
  regionConfig,
  metaRegionConfig,
  tourismAssociationListConfig,
  skiRegionConfig,
  skiAreaConfig,
  weatherDistrictConfig,
  weatherRealTimeConfig,
  measuringPointConfig,
  snowReportConfig,
  eventConfig,
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
  eventTopicsConfig,
  accommodationTypesConfig,
  webcamInfoConfig,
  wineAwardConfig,
  gastronomyConfig,
  venueConfig,
  weatherInfoConfig,
  municipalityConfig,
  districtConfig,
  regionConfig,
  metaRegionConfig,
  tourismAssociationListConfig,
  skiRegionConfig,
  skiAreaConfig,
  weatherDistrictConfig,
  weatherRealTimeConfig,
  measuringPointConfig,
  snowReportConfig,
  eventConfig,
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
