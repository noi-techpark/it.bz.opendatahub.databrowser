// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig, AnyDomain, PathSegments } from '../types';

export type DatasetConfigSource = 'any' | 'embedded' | 'generated';

export type LoadDatasetConfigFn = (
  domain: AnyDomain,
  pathSegments: PathSegments
) => Promise<DatasetConfig>;

export type LoadAllDatasetConfigsFn = () => Promise<
  Record<AnyDomain, DatasetConfig[]>
>;

export interface DatasetConfigLoader {
  source: DatasetConfigSource;
  loadDatasetConfig: LoadDatasetConfigFn;
  loadAllDatasetConfigs: LoadAllDatasetConfigsFn;
}
