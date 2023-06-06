// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { domains } from '../../../domain/openApi';
import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { articleDescription } from './article.description';
import { articleOperations } from './article.operations';
import { articleRoute } from './article.route';
import { articleViews } from './article.views';

export const articleConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: articleRoute,
  description: articleDescription,
  views: articleViews,
  operations: articleOperations,
};
