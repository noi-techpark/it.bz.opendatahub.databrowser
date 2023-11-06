// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig, Domain } from '../domain/datasetConfig/types';
import { mobilityEmbeddedDatasetConfigs } from './mobility';
import { tourismEmbeddedDatasetConfigs } from './tourism';

type EmbeddedDatasetConfigs = Record<Domain, Record<string, DatasetConfig>>;

const pathParamsToKey = (pathParams: string[]): string =>
  '/' + pathParams.join('/');

const mapDatasetConfigs = (
  datasetConfigs: DatasetConfig[]
): EmbeddedDatasetConfigs => {
  return datasetConfigs.reduce<EmbeddedDatasetConfigs>((previous, current) => {
    const configsForDomain = { ...previous[current.route.domain] } ?? {};
    const path = pathParamsToKey(current.route.pathParams);
    configsForDomain[path] = current;
    return { ...previous, [current.route.domain]: configsForDomain };
  }, {});
};

const computeEmbeddedDatasetConfigs = (): EmbeddedDatasetConfigs => {
  const tourismDatasetConfigs = mapDatasetConfigs(
    tourismEmbeddedDatasetConfigs
  );
  const mobilityDatasetConfigs = mapDatasetConfigs(
    mobilityEmbeddedDatasetConfigs
  );

  console.log('#### tourism and mobility', {
    ...tourismDatasetConfigs,
    ...mobilityDatasetConfigs,
  });

  return { ...tourismDatasetConfigs, ...mobilityDatasetConfigs };
};

export const embeddedDatasetConfigs = computeEmbeddedDatasetConfigs();

export const findEmbeddedDatasetConfig = (
  domain: string,
  pathParams: string[]
): DatasetConfig | undefined => {
  const path = pathParamsToKey(pathParams);
  const exactMatch = embeddedDatasetConfigs[domain]?.[path];
  if (exactMatch != null) {
    return exactMatch;
  }

  const configsForDomain = embeddedDatasetConfigs[domain];
  if (configsForDomain == null) {
    return undefined;
  }

  const pathParamsLength = pathParams.length;
  const candidates = Object.values(configsForDomain).filter(
    (config) => config.route.pathParams.length === pathParamsLength
  );
  const matchingConfig = candidates.find((config) => {
    const configPathParams = config.route.pathParams;
    return pathParams.every((param, index) => {
      return (
        configPathParams[index] === param ||
        (configPathParams[index].startsWith('{') &&
          configPathParams[index].endsWith('}'))
      );
    });
  });
  console.log('#### matching config', matchingConfig);
  return matchingConfig;
};
