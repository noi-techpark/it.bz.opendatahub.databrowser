// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig, Domain } from '../types';

export type DatasetConfigSource = 'any' | 'embedded' | 'generated';

export type LoadDatasetConfigFn = (
  domain: string,
  pathParams: string[]
) => Promise<DatasetConfig>;

export type LoadAllDatasetConfigsFn = () => Promise<
  Record<Domain, DatasetConfig[]>
>;

export interface DatasetConfigLoader {
  source: DatasetConfigSource;
  loadDatasetConfig: LoadDatasetConfigFn;
  loadAllDatasetConfigs: LoadAllDatasetConfigsFn;
}
