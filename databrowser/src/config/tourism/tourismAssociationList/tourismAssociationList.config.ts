// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { tourismAssociationListDescription } from './tourismAssociationList.description';
import { tourismAssociationListOperations } from './tourismAssociationList.operations';
import { tourismAssociationListViews } from './tourismAssociationList.views';
import { tourismAssociationListRoute } from './tourismAssociationList.route';

export const tourismAssociationListConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: tourismAssociationListRoute,
  description: tourismAssociationListDescription,
  views: tourismAssociationListViews,
  operations: tourismAssociationListOperations,
};
