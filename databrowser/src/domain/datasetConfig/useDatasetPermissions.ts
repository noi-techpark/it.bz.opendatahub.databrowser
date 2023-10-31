// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Ref, ref, watchEffect } from 'vue';
import { DatasetConfig } from './types';
import { useAuth } from '../auth/store/auth';

interface UseDatasetPermissions {
  hasNewView: Ref<boolean>;
  hasEditView: Ref<boolean>;
  isEmbeddedSource: Ref<boolean>;
  datasetConfig: Ref<DatasetConfig | undefined>;
}

export const useDatasetPermissions = ({
  hasNewView,
  hasEditView,
  isEmbeddedSource,
  datasetConfig,
}: UseDatasetPermissions) => {
  const addRecordSupported = ref(false);
  const editRecordSupported = ref(false);
  const deleteRecordSupported = ref(false);

  watchEffect(() => {
    if (datasetConfig.value == null) {
      addRecordSupported.value = false;
      editRecordSupported.value = false;
      deleteRecordSupported.value = false;
      return;
    }

    const hasCreatePermission = computeCreatePermission(datasetConfig.value);

    const hasUpdatePermission = computeUpdatePermission(datasetConfig.value);

    const hasDeletePermission = computeDeletePermission(datasetConfig.value);

    addRecordSupported.value =
      isEmbeddedSource.value && hasCreatePermission && hasNewView.value;

    editRecordSupported.value =
      isEmbeddedSource.value && hasUpdatePermission && hasEditView.value;

    deleteRecordSupported.value = isEmbeddedSource.value && hasDeletePermission;
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
