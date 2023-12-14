// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { knownDomainsWithOpenApiDocument } from '../../../domain/openApi';
import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { publishedOnDescription } from './publishedOn.description';
import { publishedOnOperations } from './publishedOn.operations';
import { publishedOnRoute } from './publishedOn.route';
import { publishedOnViews } from './publishedOn.views';

export const publishedOnConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: knownDomainsWithOpenApiDocument.tourism.baseUrl,
  route: publishedOnRoute,
  description: publishedOnDescription,
  views: publishedOnViews,
  operations: publishedOnOperations,
};
