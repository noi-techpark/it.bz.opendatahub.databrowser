// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { odhActivityPoiDescription } from './odhActivityPoi.description';
import { odhActivityPoiViews } from './odhActivityPoi.views';
import { odhActivityPoiOperations } from './odhActivityPoi.operations';
import { odhActivityPoiRoute } from './odhActivityPoi.route';

export const odhActivityPoiConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: odhActivityPoiRoute,
  description: odhActivityPoiDescription,
  views: odhActivityPoiViews,
  operations: odhActivityPoiOperations,
};
