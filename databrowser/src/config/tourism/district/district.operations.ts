import { Operations } from '../../../domain/datasetConfig/types';
import {
  extendCreateRoles,
  extendDeleteRoles,
  extendUpdateRoles,
  ROLE_READ,
} from '../roles';

export const districtOperations: Operations = {
  readAll: {
    rolesAllowed: ROLE_READ,
  },
  read: {
    rolesAllowed: ROLE_READ,
  },
  create: {
    rolesAllowed: extendCreateRoles(['DistrictManager', 'DistrictCreate']),
  },
  update: {
    rolesAllowed: extendUpdateRoles(['DistrictManager', 'DistrictUpdate']),
  },
  delete: {
    rolesAllowed: extendDeleteRoles(['DistrictManager', 'DistrictDelete']),
  },
};
