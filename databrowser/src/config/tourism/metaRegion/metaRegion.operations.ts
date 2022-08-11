import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const metaRegionOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'MetaRegionManager',
      'MetaRegionCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'MetaRegionManager',
      'MetaRegionUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'MetaRegionManager',
      'MetaRegionDelete',
    ]),
  },
};
