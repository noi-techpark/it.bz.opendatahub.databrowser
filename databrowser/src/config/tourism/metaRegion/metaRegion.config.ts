// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { metaRegionDescription } from './metaRegion.description';
import { metaRegionOperations } from './metaRegion.operations';
import { metaRegionViews } from './metaRegion.views';
import { metaRegionRoute } from './metaRegion.route';

export const metaRegionConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: metaRegionRoute,
  description: metaRegionDescription,
  views: metaRegionViews,
  operations: metaRegionOperations,
};
