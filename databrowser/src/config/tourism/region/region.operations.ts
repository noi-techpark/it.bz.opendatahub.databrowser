import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const regionOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles(['RegionManager', 'RegionCreate']),
  },
  update: {
    rolesAllowed: extendUpdateRoles(['RegionManager', 'RegionUpdate']),
  },
  delete: {
    rolesAllowed: extendDeleteRoles(['RegionManager', 'RegionDelete']),
  },
};
