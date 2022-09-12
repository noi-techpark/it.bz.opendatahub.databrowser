import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const experienceAreaOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles([
      'ExperienceAreaManager',
      'ExperienceAreaCreate',
    ]),
  },
  update: {
    rolesAllowed: extendUpdateRoles([
      'ExperienceAreaManager',
      'ExperienceAreaUpdate',
    ]),
  },
  delete: {
    rolesAllowed: extendDeleteRoles([
      'ExperienceAreaManager',
      'ExperienceAreaDelete',
    ]),
  },
};
