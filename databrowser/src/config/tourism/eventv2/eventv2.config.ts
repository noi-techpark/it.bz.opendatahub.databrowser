// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { DatasetConfig } from '../../../domain/datasets/config/types';
import { eventv2Description } from './eventv2.description';
import { eventv2Operations } from './eventv2.operations';
import { eventv2Route } from './eventv2.route';
import { eventv2Views } from './eventv2.views';

export const eventv2Config: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: eventv2Route,
  description: eventv2Description,
  views: eventv2Views,
  operations: eventv2Operations,
};
