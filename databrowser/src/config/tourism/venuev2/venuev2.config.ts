// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { venuev2Description } from './venuev2.description';
import { venuev2Operations } from './venuev2.operations';
import { venuev2Views } from './venuev2.views';
import { venuev2Route } from './venuev2.route';

export const venuev2Config: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: venuev2Route,
  description: venuev2Description,
  views: venuev2Views,
  operations: venuev2Operations,
};
