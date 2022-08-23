import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const gastronomyOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles(['GastronomyManager', 'GastronomyCreate']),
  },
  update: {
    rolesAllowed: extendUpdateRoles(['GastronomyManager', 'GastronomyUpdate']),
  },
  delete: {
    rolesAllowed: extendDeleteRoles(['GastronomyManager', 'GastronomyDelete']),
  },
};
