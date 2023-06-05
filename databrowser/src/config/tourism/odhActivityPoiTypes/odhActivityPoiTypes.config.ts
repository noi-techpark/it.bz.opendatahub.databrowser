// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { odhActivityPoiTypesOperations } from './odhActivityPoiTypes.operations';
import { odhActivityPoiTypesDescription } from './odhActivityPoiTypes.description';
import { odhActivityPoiTypesViews } from './odhActivityPoiTypes.views';
import { odhActivityPoiTypesRoute } from './odhActivityPoiTypes.route';

export const odhActivityPoiTypesConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: odhActivityPoiTypesRoute,
  description: odhActivityPoiTypesDescription,
  views: odhActivityPoiTypesViews,
  operations: odhActivityPoiTypesOperations,
};
