// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasets/config/types';
import { domainWithOpenApiDocument } from '../../../domain/openApi';
import { experienceAreaOperations } from './experienceArea.operations';
import { experienceAreaDescription } from './experienceArea.description';
import { experienceAreaViews } from './experienceArea.views';
import { experienceAreaRoute } from './experienceArea.route';

export const experienceAreaConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domainWithOpenApiDocument.tourism.baseUrl,
  route: experienceAreaRoute,
  description: experienceAreaDescription,
  views: experienceAreaViews,
  operations: experienceAreaOperations,
};
