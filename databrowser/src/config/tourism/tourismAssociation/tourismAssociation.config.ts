// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { tourismAssociationDescription } from './tourismAssociation.description';
import { tourismAssociationOperations } from './tourismAssociation.operations';
import { tourismAssociationViews } from './tourismAssociation.views';
import { tourismAssociationRoute } from './tourismAssociation.route';

export const tourismAssociationConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: tourismAssociationRoute,
  description: tourismAssociationDescription,
  views: tourismAssociationViews,
  operations: tourismAssociationOperations,
};
