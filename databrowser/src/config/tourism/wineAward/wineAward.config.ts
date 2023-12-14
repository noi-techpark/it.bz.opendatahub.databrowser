// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { wineAwardOperations } from './wineAward.operations';
import { wineAwardDescription } from './wineAward.description';
import { wineAwardViews } from './wineAward.views';
import { wineAwardRoute } from './wineAward.route';

export const wineAwardConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: wineAwardRoute,
  description: wineAwardDescription,
  views: wineAwardViews,
  operations: wineAwardOperations,
};
