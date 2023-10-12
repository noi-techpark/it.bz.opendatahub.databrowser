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

  return { ...tourismDatasetConfigs, ...mobilityDatasetConfigs };
};

export const embeddedDatasetConfigs = computeEmbeddedDatasetConfigs();

export const findEmbeddedDatasetConfig = (
  domain: string,
  path: string
): DatasetConfig | undefined => embeddedDatasetConfigs[domain]?.[path];
