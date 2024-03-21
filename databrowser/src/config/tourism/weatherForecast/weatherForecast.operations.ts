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

export const weatherForecastOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'WeatherForecastManager',
      'WeatherForecastCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'WeatherForecastManager',
      'WeatherForecastUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'WeatherForecastManager',
      'WeatherForecastDelete',
    ]),
  },
};
