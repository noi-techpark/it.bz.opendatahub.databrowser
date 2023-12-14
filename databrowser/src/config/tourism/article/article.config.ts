// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { DatasetConfig } from '../../../domain/datasets/config/types';
import { articleDescription } from './article.description';
import { articleOperations } from './article.operations';
import { articleRoute } from './article.route';
import { articleViews } from './article.views';

export const articleConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: articleRoute,
  description: articleDescription,
  views: articleViews,
  operations: articleOperations,
};
