// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  AnyDomain,
  PathSegments,
  DatasetConfig,
  DatasetConfigSource,
} from '../types';

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
