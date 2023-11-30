// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { stationTypesDescription } from './stationTypes.description';
import { stationTypesViews } from './stationTypes.views';
import { stationTypesRoute } from './stationTypes.route';

export const stationTypesConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.mobility.baseUrl,
  route: stationTypesRoute,
  description: stationTypesDescription,
  views: stationTypesViews,
};
