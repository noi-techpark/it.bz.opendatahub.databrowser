// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { knownDomainsWithOpenApiDocument } from '../../../domain/openApi';
import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { eventDescription } from './event.description';
import { eventOperations } from './event.operations';
import { eventRoute } from './event.route';
import { eventViews } from './event.views';

export const eventConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: knownDomainsWithOpenApiDocument.tourism.baseUrl,
  route: eventRoute,
  description: eventDescription,
  views: eventViews,
  operations: eventOperations,
};
