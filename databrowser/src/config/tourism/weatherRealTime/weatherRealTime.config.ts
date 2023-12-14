// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { weatherRealTimeDescription } from './weatherRealTime.description';
import { weatherRealTimeOperations } from './weatherRealTime.operations';
import { weatherRealTimeViews } from './weatherRealTime.views';
import { weatherRealTimeRoute } from './weatherRealTime.route';

export const weatherRealTimeConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: weatherRealTimeRoute,
  description: weatherRealTimeDescription,
  views: weatherRealTimeViews,
  operations: weatherRealTimeOperations,
};
