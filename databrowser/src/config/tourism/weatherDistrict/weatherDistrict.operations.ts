import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const weatherDistrictOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'WeatherDistrictManager',
      'WeatherDistrictCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'WeatherDistrictManager',
      'WeatherDistrictUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'WeatherDistrictManager',
      'WeatherDistrictDelete',
    ]),
  },
};
