// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { weatherDescription } from './weather.description';
import { weatherOperations } from './weather.operations';
import { weatherViews } from './weather.views';
import { weatherRoute } from './weather.route';

export const weatherConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: weatherRoute,
  description: weatherDescription,
  views: weatherViews,
  operations: weatherOperations,
};
