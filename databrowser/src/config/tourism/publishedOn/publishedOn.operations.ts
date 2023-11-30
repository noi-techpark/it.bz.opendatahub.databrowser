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

export const publishedOnOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'PublishedOnManager',
      'PublishedOnCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'PublishedOnManager',
      'PublishedOnUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'PublishedOnManager',
      'PublishedOnDelete',
    ]),
  },
};
