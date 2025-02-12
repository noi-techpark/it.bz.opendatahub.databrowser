// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ToRefs, toRefs, toValue } from 'vue';
import { reactiveComputed } from '@vueuse/core';
import { Operations, ToMaybeRefs } from '../../config/types';
import { useAuth } from '../../../auth/store/auth';

export interface ComputeDatasetPermission {
  addRecordSupported: boolean;
  editRecordSupported: boolean;
  deleteRecordSupported: boolean;
}

export interface ComputeDatasetPermissionParams {
  hasEditView: boolean;
  hasNewView: boolean;
  isEmbeddedSource: boolean;
  operations?: Operations;
}

export const computeDatasetPermission = ({
  hasEditView,
  hasNewView,
  isEmbeddedSource,
  operations,
}: ComputeDatasetPermissionParams): ComputeDatasetPermission => {
  if (operations == null || isEmbeddedSource === false) {
    return {
      addRecordSupported: false,
      editRecordSupported: false,
      deleteRecordSupported: false,
    };
  }

  const hasCreatePermission = computeCreatePermission(operations);
  const hasUpdatePermission = computeUpdatePermission(operations);
  const hasDeletePermission = computeDeletePermission(operations);

  const addRecordSupported = hasCreatePermission && hasNewView;
  const editRecordSupported = hasUpdatePermission && hasEditView;
  const deleteRecordSupported = hasDeletePermission;

  return { addRecordSupported, editRecordSupported, deleteRecordSupported };
};

export const useComputeDatasetPermission = (
  params: ToMaybeRefs<ComputeDatasetPermissionParams>
): ToRefs<ComputeDatasetPermission> => {
  const result = reactiveComputed(() => {
    const hasEditView = toValue(params.hasEditView);
    const hasNewView = toValue(params.hasNewView);
    const isEmbeddedSource = toValue(params.isEmbeddedSource);
    const operations = toValue(params.operations);

    return computeDatasetPermission({
      hasEditView,
      hasNewView,
      isEmbeddedSource,
      operations,
    });
  });

  return toRefs(result);
};

const computeCreatePermission = (operations?: Operations) => {
  const auth = useAuth();
  if (auth.ready === false) {
    return false;
  }
  const roles = operations?.create?.rolesAllowed;
  return roles != null ? auth.hasAnyRole(roles) : false;
};

const computeUpdatePermission = (operations?: Operations) => {
  const auth = useAuth();
  if (auth.ready === false) {
    return false;
  }
  const roles = operations?.update?.rolesAllowed;
  return roles != null ? auth.hasAnyRole(roles) : false;
};

const computeDeletePermission = (operations?: Operations) => {
  const auth = useAuth();
  if (auth.ready === false) {
    return false;
  }
  const roles = operations?.delete?.rolesAllowed;
  return roles != null ? auth.hasAnyRole(roles) : false;
};
