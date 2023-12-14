// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { DatasetConfig } from '../../../domain/datasets/config/types';
import { publishedOnDescription } from './publishedOn.description';
import { publishedOnOperations } from './publishedOn.operations';
import { publishedOnRoute } from './publishedOn.route';
import { publishedOnViews } from './publishedOn.views';

export const publishedOnConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: publishedOnRoute,
  description: publishedOnDescription,
  views: publishedOnViews,
  operations: publishedOnOperations,
};
