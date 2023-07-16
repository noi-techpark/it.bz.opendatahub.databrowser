// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { stationTypesDescription } from './stationTypes.description';
import { stationTypesViews } from './stationTypes.views';
import { stationTypesRoute } from './stationTypes.route';

export const stationTypesConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.mobility.baseUrl,
  route: stationTypesRoute,
  description: stationTypesDescription,
  views: stationTypesViews,
};
