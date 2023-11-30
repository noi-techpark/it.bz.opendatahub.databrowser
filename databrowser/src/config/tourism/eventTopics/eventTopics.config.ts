// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { eventTopicsOperations } from './eventTopics.operations';
import { eventTopicsDescription } from './eventTopics.description';
import { eventTopicsViews } from './eventTopics.views';
import { eventTopicsRoute } from './eventTopics.route';

export const eventTopicsConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: eventTopicsRoute,
  description: eventTopicsDescription,
  views: eventTopicsViews,
  operations: eventTopicsOperations,
};
