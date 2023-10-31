// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  embeddedDatasetConfigs,
  findEmbeddedDatasetConfig,
} from '../../../config/config';
import { DatasetConfig, Domain } from '../types';
import {
  DatasetConfigLoader,
  LoadDatasetConfigFn,
  LoadAllDatasetConfigsFn,
} from './types';

const loadDatasetConfig: LoadDatasetConfigFn = async (domain, pathParams) => {
  const config = findEmbeddedDatasetConfig(domain, pathParams);

  if (config == null) {
    return Promise.reject(
      `No embedded dataset config found for domain ${domain} and path ${pathParams}`
    );
  }

  return Promise.resolve(config);
};

const loadAllDatasetConfigs: LoadAllDatasetConfigsFn = async () => {
  return Object.keys(embeddedDatasetConfigs).reduce<
    Record<Domain, DatasetConfig[]>
  >(
    (previous, domain) => ({
      ...previous,
      [domain]: Object.values(embeddedDatasetConfigs[domain]),
    }),
    {}
  );
};

export const providerForEmbeddedDatasetConfig: DatasetConfigLoader = {
  source: 'embedded',
  loadDatasetConfig,
  loadAllDatasetConfigs,
};
