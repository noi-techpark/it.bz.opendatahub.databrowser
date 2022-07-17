import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const odhActivityPoiTypesOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'ODHActivityPoiTypesManager',
      'ODHActivityPoiTypesCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'ODHActivityPoiTypesManager',
      'ODHActivityPoiTypesUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'ODHActivityPoiTypesManager',
      'ODHActivityPoiTypesDelete',
    ]),
  },
};
