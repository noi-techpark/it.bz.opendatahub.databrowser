// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetRoute } from '../../../domain/datasetConfig/types';

export const webcamInfoRoute: DatasetRoute = {
  domain: 'tourism',
  pathSegments: ['v1', 'WebcamInfo'],
};
