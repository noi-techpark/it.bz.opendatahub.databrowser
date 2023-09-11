// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig, DatasetDomain } from '../domain/datasetConfig/types';
import {
  defaultTourismSingleRecordQueryParameters,
  defaultTourismTableQueryParameters,
} from '../domain/datasets/tableView/defaultValues';
import { representationConfig, stationTypesConfig } from './mobility';
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
  weatherConfig,
  weatherDistrictConfig,
  weatherRealTimeConfig,
  measuringPointConfig,
  snowReportConfig,
  eventConfig,
  experienceAreaConfig,
  metaDataConfig,
  publishedOnConfig,
  sourceConfig,
} from './tourism';
import { findCandidateConfigs } from './utils';

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
  weatherConfig,
  weatherDistrictConfig,
  weatherRealTimeConfig,
  measuringPointConfig,
  snowReportConfig,
  eventConfig,
  experienceAreaConfig,
  metaDataConfig,
  publishedOnConfig,
  sourceConfig,
  representationConfig,
  stationTypesConfig,
].map<DatasetConfig>((config) => ({
  ...config,
  views: {
    ...config.views,
    table:
      config.views?.table == null
        ? undefined
        : {
            ...config.views?.table,
            defaultQueryParams: defaultTourismTableQueryParameters,
          },
    detail:
      config.views?.detail == null
        ? undefined
        : {
            ...config.views?.detail,
            defaultQueryParams: defaultTourismSingleRecordQueryParameters,
          },
    edit:
      config.views?.edit == null
        ? undefined
        : {
            ...config.views?.edit,
            defaultQueryParams: defaultTourismSingleRecordQueryParameters,
          },
    quick:
      config.views?.quick == null
        ? undefined
        : {
            ...config.views?.quick,
            defaultQueryParams: defaultTourismSingleRecordQueryParameters,
          },
    raw:
      config.views?.raw == null
        ? undefined
        : {
            ...config.views?.raw,
            defaultQueryParams: defaultTourismSingleRecordQueryParameters,
          },
  },
}));

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
): DatasetConfig | undefined => {
  // Try to find a literal match (fastest resolution attempt)
  const literalMatchedConfig = embeddedDatasetConfigs[domain]?.[path];
  if (literalMatchedConfig != null) {
    return literalMatchedConfig;
  }

  // Domain is not found, return undefined.
  if (embeddedDatasetConfigs[domain] == null) {
    return undefined;
  }

  // Domain is found, but path is not found via literal match. That may
  // be because the path contains dynamic path params. In that case,
  // try to find a config using candidates.
  const candidates = findCandidateConfigs(path, embeddedDatasetConfigs[domain]);

  // If there are no candidates, return undefined.
  if (candidates.length === 0) {
    return undefined;
  }

  // Sort candidates by rank and return the config with the highest rank.
  candidates.sort((a, b) => b.rank - a.rank);
  return candidates[0].config;
};
