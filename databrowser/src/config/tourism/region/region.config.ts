// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { knownDomainsWithOpenApiDocument } from '../../../domain/openApi';
import { regionDescription } from './region.description';
import { regionOperations } from './region.operations';
import { regionViews } from './region.views';
import { regionRoute } from './region.route';

export const regionConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: knownDomainsWithOpenApiDocument.tourism.baseUrl,
  route: regionRoute,
  description: regionDescription,
  views: regionViews,
  operations: regionOperations,
};
