// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { knownDomainsWithOpenApiDocument } from '../../../domain/openApi';
import { venueDescription } from './venue.description';
import { venueOperations } from './venue.operations';
import { venueViews } from './venue.views';
import { venueRoute } from './venue.route';

export const venueConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: knownDomainsWithOpenApiDocument.tourism.baseUrl,
  route: venueRoute,
  description: venueDescription,
  views: venueViews,
  operations: venueOperations,
};
