// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { measuringPointDescription } from './measuringPoint.description';
import { measuringPointOperations } from './measuringPoint.operations';
import { measuringPointViews } from './measuringPoint.views';
import { measuringPointRoute } from './measuringPoint.route';

export const measuringPointConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: measuringPointRoute,
  description: measuringPointDescription,
  views: measuringPointViews,
  operations: measuringPointOperations,
};
