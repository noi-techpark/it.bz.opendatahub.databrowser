// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../domain/datasets/config/types';
import { defaultMobilityTableQueryParameters } from '../../domain/datasets/ui/tableView/defaultValues';
import { representationConfig } from './representation/representation.config';
import { stationTypesConfig } from './stationTypes/stationTypes.config';

export const mobilityEmbeddedDatasetConfigs = [
  representationConfig,
  stationTypesConfig,
].map<DatasetConfig>((config) => ({
  ...config,
  views: {
    ...config.views,
    table:
      config.views?.table == null
        ? undefined
        : {
            ...config.views?.table,
            defaultQueryParams: defaultMobilityTableQueryParameters,
          },
  },
}));
