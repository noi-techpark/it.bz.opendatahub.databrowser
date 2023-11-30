// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  DatasetConfig,
  AnyDomain,
  PathSegments,
} from '../domain/datasets/config/types';
import { mobilityEmbeddedDatasetConfigs } from './mobility';
import { tourismEmbeddedDatasetConfigs } from './tourism';

type EmbeddedDatasetConfigs = Record<AnyDomain, Record<string, DatasetConfig>>;

const pathSegmentsToPath = (pathSegments: PathSegments): string =>
  '/' + pathSegments.join('/');

const mapDatasetConfigs = (
  datasetConfigs: DatasetConfig[]
): EmbeddedDatasetConfigs => {
  return datasetConfigs.reduce<EmbeddedDatasetConfigs>((previous, current) => {
    const configsForDomain = { ...previous[current.route.domain] } ?? {};
    const path = pathSegmentsToPath(current.route.pathSegments);
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
  pathSegments: PathSegments
): DatasetConfig | undefined => {
  const path = pathSegmentsToPath(pathSegments);
  const exactMatch = embeddedDatasetConfigs[domain]?.[path];
  if (exactMatch != null) {
    return exactMatch;
  }

  const configsForDomain = embeddedDatasetConfigs[domain];
  if (configsForDomain == null) {
    return undefined;
  }

  const pathSegmentsLength = pathSegments.length;
  const candidates = Object.values(configsForDomain).filter(
    (config) => config.route.pathSegments.length === pathSegmentsLength
  );
  const matchingConfig = candidates.find((config) => {
    const configPathSegments = config.route.pathSegments;
    return pathSegments.every((param, index) => {
      return (
        configPathSegments[index] === param ||
        (configPathSegments[index].startsWith('{') &&
          configPathSegments[index].endsWith('}'))
      );
    });
  });
  console.log('#### matching config', matchingConfig);
  return matchingConfig;
};
