// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetRoute } from '../../../domain/datasets/config/types';

export const stationTypesRoute: DatasetRoute = {
  domain: 'mobility',
  pathSegments: ['v2', 'flat', '{stationTypes}'],
};
