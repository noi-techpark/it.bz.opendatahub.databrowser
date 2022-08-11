import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const weatherInfoOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'WeatherInfoManager',
      'WeatherInfoCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'WeatherInfoManager',
      'WeatherInfoUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'WeatherInfoManager',
      'WeatherInfoDelete',
    ]),
  },
};
