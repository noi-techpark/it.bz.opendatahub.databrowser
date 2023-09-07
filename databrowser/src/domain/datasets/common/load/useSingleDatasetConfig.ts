// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ref, watch } from 'vue';
import { stringifyQuery } from 'vue-router';
import { computeDatasetConfigForCurrentRoute } from '../../../datasetConfig/datasetConfig';
import { useDatasetPermissions } from '../../../datasetConfig/useDatasetPermissions';

export const useSingleDatasetConfig = () => {
  const {
    resolvedDatasetConfig,
    allParams,
    isResolving,
    detailView,
    editView,
    newView,
    quickView,
    getDataForField,
  } = computeDatasetConfigForCurrentRoute();

  const url = ref<string>();
  const hasDetailView = ref(false);
  const hasEditView = ref(false);
  const hasNewView = ref(false);
  const hasQuickView = ref(false);

  const { addRecordSupported, editRecordSupported } = useDatasetPermissions(
    resolvedDatasetConfig
  );

  watch(
    isResolving,
    (resolving) => {
      if (resolving) {
        return;
      }

      hasDetailView.value = resolvedDatasetConfig.value?.hasDetailView ?? false;
      hasEditView.value = resolvedDatasetConfig.value?.hasEditView ?? false;
      hasNewView.value = resolvedDatasetConfig.value?.hasNewView ?? false;
      hasQuickView.value = resolvedDatasetConfig.value?.hasQuickView ?? false;

      // Compute url
      url.value = computeUrl(
        resolvedDatasetConfig.value?.currentPath,
        allParams.value
      );
    },
    { immediate: true }
  );

  return {
    url,
    allParams,
    addRecordSupported,
    editRecordSupported,
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    detailView,
    editView,
    newView,
    quickView,
    isResolving,
    getDataForField,
  };
};

const computeUrl = (
  currentPath: string | undefined,
  allParams: Record<string, string>
) => {
  if (currentPath == null) {
    return undefined;
  }

  const queryParams = stringifyQuery(allParams);

  return currentPath + (queryParams.length > 0 ? '?' + queryParams : '');
};
