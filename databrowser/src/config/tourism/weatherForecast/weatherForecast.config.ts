// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { weatherForecastDescription } from './weatherForecast.description';
import { weatherForecastOperations } from './weatherForecast.operations';
import { weatherForecastViews } from './weatherForecast.views';
import { weatherForecastRoute } from './weatherForecast.route';

export const weatherForecastConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: weatherForecastRoute,
  description: weatherForecastDescription,
  views: weatherForecastViews,
  operations: weatherForecastOperations,
};
