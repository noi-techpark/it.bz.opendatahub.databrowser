// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig, DatasetDomain } from '../domain/datasetConfig/types';
import { mobilityEmbeddedDatasetConfigs } from './mobility';
import { tourismEmbeddedDatasetConfigs } from './tourism';

type EmbeddedDatasetConfigs = Record<
  DatasetDomain,
  Record<string, DatasetConfig>
>;

const mapDatasetConfigs = (
  datasetConfigs: DatasetConfig[]
): EmbeddedDatasetConfigs => {
  return datasetConfigs.reduce<EmbeddedDatasetConfigs>((previous, current) => {
    const configsForDomain = { ...previous[current.route.domain] } ?? {};
    const path = '/' + current.route.pathParams.join('/');
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
  path: string
): DatasetConfig | undefined => {
  const exactMatch = embeddedDatasetConfigs[domain]?.[path];
  if (exactMatch != null) {
    return exactMatch;
  }

  const configsForDomain = embeddedDatasetConfigs[domain];
  if (configsForDomain == null) {
    return undefined;
  }

  const pathParams = path.split('/').filter((p) => p !== '');
  const pathParamsLength = pathParams.length;
  const configs = Object.values(configsForDomain);
  const candidates = configs.filter(
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
