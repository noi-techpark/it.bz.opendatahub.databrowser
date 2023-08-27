// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig, DatasetDomain, DatasetRoute } from '../types';

export type SourceType = 'any' | 'embedded' | 'generated';

export interface SourceResult {
  config?: DatasetConfig;
}

export type SourceResolver = (
  datasetRoute: DatasetRoute
) => Promise<DatasetConfig>;

export interface DatasetConfigSource {
  source: SourceType;
  resolve: SourceResolver;
  getAllDatasetConfigs(): Promise<Record<DatasetDomain, DatasetConfig[]>>;
}
