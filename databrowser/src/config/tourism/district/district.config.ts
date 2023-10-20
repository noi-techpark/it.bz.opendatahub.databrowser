// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { districtDescription } from './district.description';
import { districtOperations } from './district.operations';
import { districtViews } from './district.views';
import { districtRoute } from './district.route';

export const districtConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: districtRoute,
  description: districtDescription,
  views: districtViews,
  operations: districtOperations,
};
