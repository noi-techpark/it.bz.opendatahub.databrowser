// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { pushResponseDescription } from './pushResponse.description';
import { pushResponseOperations } from './pushResponse.operations';
import { pushResponseViews } from './pushResponse.views';
import { pushResponseRoute } from './pushResponse.route';

export const pushResponseConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: pushResponseRoute,
  description: pushResponseDescription,
  views: pushResponseViews,
  operations: pushResponseOperations,
};
