// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, ToRefs, computed, readonly, ref, toValue } from 'vue';
import { useResolveDatasetConfig } from './datasetConfigResolver';
import { useDatasetConfigSourceComputations } from './datasetConfigSource';
import { useValueExtractor } from './extract/valueExtractor';
import { DatasetConfigSource } from './load/types';
import { useComputeDatasetLocation } from './location/datasetLocation';
import { useComputeDatasetPermission } from './permission/datasetPermission';
import { useParamsReplacer } from './replace/paramsReplacer';
import { usePropertyPathReplacer } from './replace/propertyPathReplacer';
import { RouteLocation } from './types';
import { useComputeView } from './view/view';
import { useComputeViewKey } from './view/viewKey';
import { useComputeViewPresence } from './view/viewPresence';
import { useComputeViewType } from './view/viewType';

export const useDatasetInfo = (
  routeLocation: MaybeRef<ToRefs<RouteLocation>>,
  preferredSource: MaybeRef<DatasetConfigSource> = ref<DatasetConfigSource>(
    'any'
  )
) => {
  // Compute route location info
  const { routeName, routeDomain, routePath, routeId, routeQuery } =
    toValue(routeLocation);

  // Resolve dataset config
  const { isResolving, isError, datasetConfig, error } =
    useResolveDatasetConfig(preferredSource, routeDomain, routePath);

  // Compute source type
  const { isEmbeddedSource, isGeneratedSource } =
    useDatasetConfigSourceComputations(datasetConfig);

  // Compute view key
  const viewKey = useComputeViewKey(routeName);

  // Compute dataset location info
  const { datasetDomain, datasetPath, datasetQuery, datasetId, fullPath } =
    useComputeDatasetLocation({
      datasetConfig,
      viewKey,
      routeDomain,
      routePath,
      routeId,
      routeQuery,
    });

  const stringifiedQuery = computed(() => datasetQuery.value?.stringified);

  // Build params replacement facility
  const paramsReplacer = useParamsReplacer(stringifiedQuery);
  const propertyPathReplacer = usePropertyPathReplacer(paramsReplacer);
  const extractValueByPath = useValueExtractor(paramsReplacer);

  const view = useComputeView({
    datasetConfig,
    viewKey,
    paramsReplacer,
    propertyPathReplacer,
  });

  // Compute view type
  const {
    isTableView,
    isDetailView,
    isEditView,
    isNewView,
    isQuickView,
    isRawView,
  } = useComputeViewType(routeName);

  // Compute which views are present in the dataset config
  const {
    hasTableView,
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    hasRawView,
  } = useComputeViewPresence(datasetConfig);

  // Compute permissions
  const operations = computed(() => datasetConfig.value?.operations);
  const { addRecordSupported, editRecordSupported, deleteRecordSupported } =
    useComputeDatasetPermission({
      hasEditView,
      hasNewView,
      isEmbeddedSource,
      operations,
    });

  return {
    isLoading: readonly(isResolving),
    isError: readonly(isError),
    error: readonly(error),
    hasConfig: computed(() => datasetConfig.value != null),
    view: readonly(view),
    description: computed(() => datasetConfig.value?.description),
    fullPath: readonly(fullPath),
    datasetDomain: readonly(datasetDomain),
    datasetPath: readonly(datasetPath),
    datasetQuery: readonly(datasetQuery),
    datasetId: readonly(datasetId),
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
    paramsReplacer: readonly(paramsReplacer),
    extractValueByPath: readonly(extractValueByPath),
  };
};
