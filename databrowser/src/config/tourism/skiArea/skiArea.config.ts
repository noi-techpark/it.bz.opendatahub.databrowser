// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { skiAreaDescription } from './skiArea.description';
import { skiAreaOperations } from './skiArea.operations';
import { skiAreaViews } from './skiArea.views';
import { skiAreaRoute } from './skiArea.route';

export const skiAreaConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: skiAreaRoute,
  description: skiAreaDescription,
  views: skiAreaViews,
  operations: skiAreaOperations,
};
