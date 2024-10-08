// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { DatasetConfig } from '../../../domain/datasets/config/types';
import { noinewsDescription } from './noinews.description';
import { noinewsOperations } from './noinews.operations';
import { noinewsRoute } from './noinews.route';
import { noinewsViews } from './noinews.views';

export const noinewsConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: noinewsRoute,
  description: noinewsDescription,
  views: noinewsViews,
  operations: noinewsOperations,
};
