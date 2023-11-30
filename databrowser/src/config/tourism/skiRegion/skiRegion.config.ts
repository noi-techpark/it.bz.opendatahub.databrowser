// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { skiRegionDescription } from './skiRegion.description';
import { skiRegionOperations } from './skiRegion.operations';
import { skiRegionViews } from './skiRegion.views';
import { skiRegionRoute } from './skiRegion.route';

export const skiRegionConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: skiRegionRoute,
  description: skiRegionDescription,
  views: skiRegionViews,
  operations: skiRegionOperations,
};
