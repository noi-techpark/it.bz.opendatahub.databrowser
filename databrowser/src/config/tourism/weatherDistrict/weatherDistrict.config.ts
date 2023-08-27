// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { knownDomainsWithOpenApiDocument } from '../../../domain/openApi';
import { weatherDistrictDescription } from './weatherDistrict.description';
import { weatherDistrictOperations } from './weatherDistrict.operations';
import { weatherDistrictViews } from './weatherDistrict.views';
import { weatherDistrictRoute } from './weatherDistrict.route';

export const weatherDistrictConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: knownDomainsWithOpenApiDocument.tourism.baseUrl,
  route: weatherDistrictRoute,
  description: weatherDistrictDescription,
  views: weatherDistrictViews,
  operations: weatherDistrictOperations,
};
