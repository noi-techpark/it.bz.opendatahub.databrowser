// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { knownDomainsWithOpenApiDocument } from '../../../domain/openApi';
import { weatherInfoDescription } from './weatherInfo.description';
import { weatherInfoOperations } from './weatherInfo.operations';
import { weatherInfoViews } from './weatherInfo.views';
import { weatherInfoRoute } from './weatherInfo.route';

export const weatherInfoConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: knownDomainsWithOpenApiDocument.tourism.baseUrl,
  route: weatherInfoRoute,
  description: weatherInfoDescription,
  views: weatherInfoViews,
  operations: weatherInfoOperations,
};
