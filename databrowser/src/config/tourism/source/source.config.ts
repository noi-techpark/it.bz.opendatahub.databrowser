// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { sourceDescription } from './source.description';
import { sourceOperations } from './source.operations';
import { sourceRoute } from './source.route';
import { sourceViews } from './source.views';

export const sourceConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: sourceRoute,
  description: sourceDescription,
  views: sourceViews,
  operations: sourceOperations,
};
