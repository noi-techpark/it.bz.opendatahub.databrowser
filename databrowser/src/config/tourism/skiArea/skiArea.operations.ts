import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const skiAreaOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles(['SkiAreaManager', 'SkiAreaCreate']),
  },
  update: {
    rolesAllowed: extendUpdateRoles(['SkiAreaManager', 'SkiAreaUpdate']),
  },
  delete: {
    rolesAllowed: extendDeleteRoles(['SkiAreaManager', 'SkiAreaDelete']),
  },
};
