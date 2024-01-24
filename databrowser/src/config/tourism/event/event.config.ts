// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { DatasetConfig } from '../../../domain/datasets/config/types';
import { eventDescription } from './event.description';
import { eventOperations } from './event.operations';
import { eventRoute } from './event.route';
import { eventViews } from './event.views';

export const eventConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: eventRoute,
  description: eventDescription,
  views: eventViews,
  operations: eventOperations,
};
