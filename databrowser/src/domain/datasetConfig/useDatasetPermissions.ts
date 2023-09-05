// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Ref, ref, watchEffect } from 'vue';
import { DatasetConfig } from './types';
import { useAuth } from '../auth/store/auth';
import { ResolvedDatasetConfig } from './datasetConfig';

export const useDatasetPermissions = (
  resolvedDatasetConfig: Ref<ResolvedDatasetConfig | undefined>
) => {
  const addRecordSupported = ref(false);
  const editRecordSupported = ref(false);
  const deleteRecordSupported = ref(false);

  watchEffect(() => {
    if (resolvedDatasetConfig.value == null) {
      addRecordSupported.value = false;
      editRecordSupported.value = false;
      deleteRecordSupported.value = false;
      return;
    }

    const { config, isSourceEmbedded, hasNewView, hasEditView } =
      resolvedDatasetConfig.value;

    const hasCreatePermission = computeCreatePermission(config);

    const hasUpdatePermission = computeUpdatePermission(config);

    const hasDeletePermission = computeDeletePermission(config);

    addRecordSupported.value =
      isSourceEmbedded && hasCreatePermission && hasNewView;

    editRecordSupported.value =
      isSourceEmbedded && hasUpdatePermission && hasEditView;

    deleteRecordSupported.value = isSourceEmbedded && hasDeletePermission;
  });
  return {
    addRecordSupported,
    editRecordSupported,
    deleteRecordSupported,
  };
};

const computeCreatePermission = (config: DatasetConfig) => {
  const auth = useAuth();
  const roles = config.operations?.create?.rolesAllowed;
  return roles != null ? auth.hasAnyRole(roles) : false;
};

const computeUpdatePermission = (config: DatasetConfig) => {
  const auth = useAuth();
  const roles = config.operations?.update?.rolesAllowed;
  return roles != null ? auth.hasAnyRole(roles) : false;
};

const computeDeletePermission = (config: DatasetConfig) => {
  const auth = useAuth();
  const roles = config.operations?.delete?.rolesAllowed;
  return roles != null ? auth.hasAnyRole(roles) : false;
};
