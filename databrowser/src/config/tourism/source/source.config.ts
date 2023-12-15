// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { domains } from '../../../domain/openApi';
import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { sourceDescription } from './source.description';
import { sourceOperations } from './source.operations';
import { sourceRoute } from './source.route';
import { sourceViews } from './source.views';

export const sourceConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: sourceRoute,
  description: sourceDescription,
  views: sourceViews,
  operations: sourceOperations,
};
