// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { odhTagDescription } from './odhTag.description';
import { odhTagOperations } from './odhTag.operations';
import { odhTagViews } from './odhTag.views';
import { odhTagRoute } from './odhTag.route';

export const odhTagConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: odhTagRoute,
  description: odhTagDescription,
  views: odhTagViews,
  operations: odhTagOperations,
};
