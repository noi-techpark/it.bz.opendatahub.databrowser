// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { computed, readonly, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useDatasetSourceStore } from './datasetSourceStore';
import { useDatasetConfigResolver } from '../datasetConfigResolver';
import { useDatasetConfigSourceComputations } from '../source/sourceType';
import { useComputeViewPresence } from '../view/viewPresence';
import { useComputeDatasetViewInfo } from '../view/datasetViewInfo';
import { useComputeDatasetPermission } from '../permission/datasetPermission';
import { useComputeRouteLocation } from '../location/routeLocation';
import { useComputeDatasetLocation } from '../location/datasetLocation';
import { useComputeDatasetReplacement } from '../replacement/datasetReplacement';

export const useDatasetConfigStore = defineStore('datasetConfigStore', () => {
  const router = useRouter();
  const datasetSourceStore = useDatasetSourceStore();
  const { source } = storeToRefs(datasetSourceStore);

  const { routeDomain, routePath, routeId, routeQuery } =
    useComputeRouteLocation(router.currentRoute);

  const { isResolving, isError, datasetConfig, error } =
    useDatasetConfigResolver(source, routeDomain, routePath);

  // Update source
  // TODO: maybe better to bring source into this store?
  watch(
    datasetConfig,
    (c) => {
      if (c != null) {
        source.value = c.source;
      }
    },
    { immediate: true }
  );

  // Compute source type
  const { isEmbeddedSource, isGeneratedSource } =
    useDatasetConfigSourceComputations(datasetConfig);

  // Compute view presence
  const {
    hasTableView,
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    hasRawView,
  } = useComputeViewPresence(datasetConfig);

  const routeName = computed(() => router.currentRoute.value.name);
  const {
    isTableView,
    isDetailView,
    isEditView,
    isNewView,
    isQuickView,
    isRawView,
    viewKey,
  } = useComputeDatasetViewInfo(routeName);

  const { datasetPath, datasetQuery, fullPath } = useComputeDatasetLocation({
    datasetConfig,
    viewKey,
    routePath,
    routeId,
    routeQuery,
  });

  const { view, getDataForField } = useComputeDatasetReplacement({
    datasetConfig,
    viewKey,
    datasetQuery,
  });

  const operations = computed(() => datasetConfig.value?.operations);
  const { addRecordSupported, editRecordSupported, deleteRecordSupported } =
    useComputeDatasetPermission({
      hasEditView,
      hasNewView,
      isEmbeddedSource,
      operations,
    });

  return {
    isResolving: readonly(isResolving),
    isError,
    error,
    hasConfig: computed(() => datasetConfig.value != null),
    view: readonly(view),
    description: computed(() => datasetConfig.value?.description),
    getDataForField: readonly(getDataForField),
    fullPath: readonly(fullPath),
    datasetQuery: readonly(datasetQuery),
    datasetDomain: readonly(routeDomain),
    datasetPath: readonly(datasetPath),
    isEmbeddedSource: readonly(isEmbeddedSource),
    isGeneratedSource: readonly(isGeneratedSource),
    hasTableView: readonly(hasTableView),
    hasDetailView: readonly(hasDetailView),
    hasEditView: readonly(hasEditView),
    hasNewView: readonly(hasNewView),
    hasQuickView: readonly(hasQuickView),
    hasRawView: readonly(hasRawView),
    isTableView: readonly(isTableView),
    isDetailView: readonly(isDetailView),
    isEditView: readonly(isEditView),
    isNewView: readonly(isNewView),
    isQuickView: readonly(isQuickView),
    isRawView: readonly(isRawView),
    addRecordSupported: readonly(addRecordSupported),
    editRecordSupported: readonly(editRecordSupported),
    deleteRecordSupported: readonly(deleteRecordSupported),
  };
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDatasetConfigStore, import.meta.hot)
  );
}
