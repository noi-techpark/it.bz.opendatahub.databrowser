// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const snowReportOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles(['SnowReportManager', 'SnowReportCreate']),
  },
  update: {
    rolesAllowed: extendUpdateRoles(['SnowReportManager', 'SnowReportUpdate']),
  },
  delete: {
    rolesAllowed: extendDeleteRoles(['SnowReportManager', 'SnowReportDelete']),
  },
};
