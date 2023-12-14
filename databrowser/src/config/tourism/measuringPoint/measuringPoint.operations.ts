// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Operations } from '../../../domain/datasets/config/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const measuringPointOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'MeasuringPointManager',
      'MeasuringPointCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'MeasuringPointManager',
      'MeasuringPointUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'MeasuringPointManager',
      'MeasuringPointDelete',
    ]),
  },
};
