// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { knownDomainsWithOpenApiDocument } from '../../../domain/openApi';
import { metaRegionDescription } from './metaRegion.description';
import { metaRegionOperations } from './metaRegion.operations';
import { metaRegionViews } from './metaRegion.views';
import { metaRegionRoute } from './metaRegion.route';

export const metaRegionConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: knownDomainsWithOpenApiDocument.tourism.baseUrl,
  route: metaRegionRoute,
  description: metaRegionDescription,
  views: metaRegionViews,
  operations: metaRegionOperations,
};
