// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { eventOriginsDescription } from './eventOrigins.description';
import { eventOriginsViews } from './eventOrigins.views';
import { eventOriginsRoute } from './eventOrigins.route';

export const eventOriginsConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.mobility.baseUrl,
  route: eventOriginsRoute,
  description: eventOriginsDescription,
  views: eventOriginsViews,
};
