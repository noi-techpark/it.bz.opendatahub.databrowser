// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { forecastDescription } from './forecast.description';
import { forecastOperations } from './forecast.operations';
import { forecastViews } from './forecast.views';
import { forecastRoute } from './forecast.route';

export const forecastConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: forecastRoute,
  description: forecastDescription,
  views: forecastViews,
  operations: forecastOperations,
};
