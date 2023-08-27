// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { knownDomainsWithOpenApiDocument } from '../../../domain/openApi';
import { wineAwardOperations } from './wineAward.operations';
import { wineAwardDescription } from './wineAward.description';
import { wineAwardViews } from './wineAward.views';
import { wineAwardRoute } from './wineAward.route';

export const wineAwardConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: knownDomainsWithOpenApiDocument.tourism.baseUrl,
  route: wineAwardRoute,
  description: wineAwardDescription,
  views: wineAwardViews,
  operations: wineAwardOperations,
};
