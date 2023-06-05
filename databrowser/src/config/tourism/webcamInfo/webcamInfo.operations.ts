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

export const webcamInfoOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles(['WebcamInfoManager', 'WebcamInfoCreate']),
  },
  update: {
    rolesAllowed: extendUpdateRoles(['WebcamInfoManager', 'WebcamInfoUpdate']),
  },
  delete: {
    rolesAllowed: extendDeleteRoles(['WebcamInfoManager', 'WebcamInfoDelete']),
  },
};
