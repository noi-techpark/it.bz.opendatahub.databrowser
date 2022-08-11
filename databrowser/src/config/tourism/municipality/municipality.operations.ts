import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const municipalityOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'MunicipalityManager',
      'MunicipalityCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'MunicipalityManager',
      'MunicipalityUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'MunicipalityManager',
      'MunicipalityDelete',
    ]),
  },
};
