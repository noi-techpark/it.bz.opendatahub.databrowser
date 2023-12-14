// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfigLoader } from './types';
import { providerForEmbeddedDatasetConfig } from './loadEmbeddedConfig';
import { providerForGeneratedDatasetConfig } from './loadGeneratedConfig';
import { PathSegments, DatasetConfig, DatasetConfigSource } from '../types';

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
  pathSegments: PathSegments
): Promise<DatasetConfig> => {
  const providers = findDatasetConfigProviders(preferredSource);

  // Compute dataset config config
  for (const provider of providers) {
    try {
      const datasetConfig = await provider.loadDatasetConfig(
        domain,
        pathSegments
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
    `No dataset config found for domain "${domain}" and path "/${pathSegments.join(
      '/'
    )}". Maybe the path is wrong or the dataset config is missing?`
  );
};

export const findDatasetConfigProviders = (
  preferredSource: DatasetConfigSource
): DatasetConfigLoader[] => {
  // If no preferred source is given, return all providers
  if (preferredSource === 'any') {
    return datasetConfigProviders;
  }

  // Check if the preferred source is available
  const sourceFound = datasetConfigProviders.find(
    ({ source }) => source === preferredSource
  );

  // If the preferred source is available, return that one
  // as first entry in the list
  if (sourceFound != null) {
    return [
      sourceFound,
      ...datasetConfigProviders.filter((p) => p !== sourceFound),
    ];
  }

  // Otherwise return all providers
  return datasetConfigProviders;
};
