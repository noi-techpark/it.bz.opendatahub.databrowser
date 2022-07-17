import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const eventShortOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles(['EventShortManager', 'EventShortCreate']),
  },
  update: {
    rolesAllowed: extendUpdateRoles(['EventShortManager', 'EventShortUpdate']),
  },
  delete: {
    rolesAllowed: extendDeleteRoles(['EventShortManager', 'EventShortDelete']),
  },
};
