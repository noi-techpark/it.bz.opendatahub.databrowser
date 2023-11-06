// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../types';
import { DatasetConfigLoader, DatasetConfigSource } from './types';
import { providerForEmbeddedDatasetConfig } from './loadEmbeddedConfig';
import { providerForGeneratedDatasetConfig } from './loadGeneratedConfig';

const datasetConfigProviders: DatasetConfigLoader[] = [
  providerForEmbeddedDatasetConfig,
  providerForGeneratedDatasetConfig,
];

/**
 * Load dataset config from a preferred source.
 */
export const loadDatasetConfig = async (
  preferredSource: DatasetConfigSource,
  domain: string,
  pathParams: string[]
): Promise<DatasetConfig> => {
  const providers = findDatasetConfigProviders(preferredSource);

  // Compute dataset config config
  for (const provider of providers) {
    try {
      const datasetConfig = await provider.loadDatasetConfig(
        domain,
        pathParams
      );

      // If there is a valid dataset config, just use that one.
      // Otherwise try to load a fallback config
      if (datasetConfig != null) {
        return datasetConfig;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : err;
      console.error(
        `Dataset config provider for source "${provider.source}" reported a problem: `,
        errorMessage
      );
    }
  }

  throw new Error(
    `No dataset config found for domain ${domain} and path ${pathParams}`
  );
};

export const findDatasetConfigProviders = (
  source: DatasetConfigSource
): DatasetConfigLoader[] => {
  if (source === 'any') {
    return datasetConfigProviders;
  }

  const vcs = datasetConfigProviders.find((vcs) => vcs.source === source);

  return vcs == null ? [] : [vcs];
};
