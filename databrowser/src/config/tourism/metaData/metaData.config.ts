// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { metaDataDescription } from './metaData.description';
import { metaDataOperations } from './metaData.operations';
import { metaDataViews } from './metaData.views';
import { metaDataRoute } from './metaData.route';

export const metaDataConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: metaDataRoute,
  description: metaDataDescription,
  views: metaDataViews,
  operations: metaDataOperations,
};
