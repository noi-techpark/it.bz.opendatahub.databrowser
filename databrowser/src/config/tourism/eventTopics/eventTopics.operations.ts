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
      'EventTopicsManager',
      'EventTopicsCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'EventTopicsManager',
      'EventTopicsUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'EventTopicsManager',
      'EventTopicsDelete',
    ]),
  },
};
