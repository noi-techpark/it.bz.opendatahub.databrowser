import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const eventTopicsOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'eventTopicsManager',
      'eventTopicsCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'eventTopicsManager',
      'eventTopicsUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'eventTopicsManager',
      'eventTopicsDelete',
    ]),
  },
};
