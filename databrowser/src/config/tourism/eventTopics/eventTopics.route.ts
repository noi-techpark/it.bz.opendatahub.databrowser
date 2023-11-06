// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetRoute } from '../../../domain/datasetConfig/types';

export const eventTopicsRoute: DatasetRoute = {
  domain: 'tourism',
  pathSegments: ['v1', 'EventTopics'],
};
