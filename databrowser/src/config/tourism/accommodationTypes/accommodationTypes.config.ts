// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { knownDomainsWithOpenApiDocument } from '../../../domain/openApi';
import { accommodationTypesOperations } from './accommodationTypes.operations';
import { accommodationTypesDescription } from './accommodationTypes.description';
import { accommodationTypesViews } from './accommodationTypes.views';
import { accommodationTypesRoute } from './accommodationTypes.route';

export const accommodationTypesConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: knownDomainsWithOpenApiDocument.tourism.baseUrl,
  route: accommodationTypesRoute,
  description: accommodationTypesDescription,
  views: accommodationTypesViews,
  operations: accommodationTypesOperations,
};
