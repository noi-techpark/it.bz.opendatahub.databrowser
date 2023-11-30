// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { accommodationDescription } from './accommodation.description';
import { accommodationOperations } from './accommodation.operations';
import { accommodationViews } from './accommodation.views';
import { accommodationRoute } from './accommodation.route';

export const accommodationConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: accommodationRoute,
  description: accommodationDescription,
  views: accommodationViews,
  operations: accommodationOperations,
};
