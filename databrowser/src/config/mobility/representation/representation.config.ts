// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { representationDescription } from './representation.description';
import { representationViews } from './representation.views';
import { representationRoute } from './representation.route';

export const representationConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.mobility.baseUrl,
  route: representationRoute,
  description: representationDescription,
  views: representationViews,
};
