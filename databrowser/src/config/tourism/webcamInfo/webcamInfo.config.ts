// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { webcamInfoOperations } from './webcamInfo.operations';
import { webcamInfoDescription } from './webcamInfo.description';
import { webcamInfoViews } from './webcamInfo.views';
import { webcamInfoRoute } from './webcamInfo.route';

export const webcamInfoConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: webcamInfoRoute,
  description: webcamInfoDescription,
  views: webcamInfoViews,
  operations: webcamInfoOperations,
};
