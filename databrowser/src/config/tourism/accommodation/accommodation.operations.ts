import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const accommodationOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'AccommodationManager',
      'AccommodationCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'AccommodationManager',
      'AccommodationUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'AccommodationManager',
      'AccommodationDelete',
    ]),
  },
};
