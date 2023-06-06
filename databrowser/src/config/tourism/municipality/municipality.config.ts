// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { municipalityDescription } from './municipality.description';
import { municipalityOperations } from './municipality.operations';
import { municipalityViews } from './municipality.views';
import { municipalityRoute } from './municipality.route';

export const municipalityConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: municipalityRoute,
  description: municipalityDescription,
  views: municipalityViews,
  operations: municipalityOperations,
};
