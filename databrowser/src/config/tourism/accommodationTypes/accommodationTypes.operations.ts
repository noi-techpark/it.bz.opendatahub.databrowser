import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const accommodationTypesOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'AccommodationTypesManager',
      'AccommodationTypesCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'AccommodationTypesManager',
      'AccommodationTypesUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'AccommodationTypesManager',
      'AccommodationTypesDelete',
    ]),
  },
};
