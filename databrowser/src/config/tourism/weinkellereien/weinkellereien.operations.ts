import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const weinkellereienOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'WeinkellereienManager',
      'WeinkellereienCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'WeinkellereienManager',
      'WeinkellereienUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'WeinkellereienManager',
      'WeinkellereienDelete',
    ]),
  },
};
