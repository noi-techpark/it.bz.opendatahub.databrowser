// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { tagDescription } from './tag.description';
import { tagOperations } from './tag.operations';
import { tagViews } from './tag.views';
import { tagRoute } from './tag.route';

export const tagConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: tagRoute,
  description: tagDescription,
  views: tagViews,
  operations: tagOperations,
};
