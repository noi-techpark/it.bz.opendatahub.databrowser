// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { knownDomainsWithOpenApiDocument } from '../../../domain/openApi';
import { gastronomyDescription } from './gastronomy.description';
import { gastronomyOperations } from './gastronomy.operations';
import { gastronomyViews } from './gastronomy.views';
import { gastronomyRoute } from './gastronomy.route';

export const gastronomyConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: knownDomainsWithOpenApiDocument.tourism.baseUrl,
  route: gastronomyRoute,
  description: gastronomyDescription,
  views: gastronomyViews,
  operations: gastronomyOperations,
};
