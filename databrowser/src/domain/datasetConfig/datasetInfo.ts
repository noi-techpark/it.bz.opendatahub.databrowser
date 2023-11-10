// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Ref, computed, readonly, ref } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { useResolveDatasetConfig } from './datasetConfigResolver';
import { useComputeDatasetLocation } from './location/datasetLocation';
import { useComputeRouteLocation } from './location/routeLocation';
import { useComputeDatasetPermission } from './permission/datasetPermission';
import { useComputeView } from './view/view';
import { useDatasetConfigSourceComputations } from './datasetConfigSource';
import { useComputeViewType } from './view/viewType';
import { useComputeViewPresence } from './view/viewPresence';
import { DatasetConfigSource } from './load/types';
import { useComputeViewKey } from './view/viewKey';
import { useValueByPathExtractor } from './extract/valueExtractor';
import { useParamsReplacer } from './replace/paramsReplacer';
import { usePropertyMappingReplacer } from './replace/propertyMappingReplacer';

export const useDatasetInfo = (
  route: Ref<RouteLocationNormalizedLoaded>,
  preferredSource = ref<DatasetConfigSource>('any')
) => {
  // Compute route location info
  const { routeName, routeDomain, routePath, routeId, routeQuery } =
    useComputeRouteLocation(route);

  // Resolve dataset config
  const { isResolving, isError, datasetConfig, error } =
    useResolveDatasetConfig(preferredSource, routeDomain, routePath);

  // Compute source type
  const { isEmbeddedSource, isGeneratedSource } =
    useDatasetConfigSourceComputations(datasetConfig);

  // Compute view key
  const viewKey = useComputeViewKey(routeName);

  // Compute dataset location info
  const { datasetDomain, datasetPath, datasetQuery, fullPath } =
    useComputeDatasetLocation({
      datasetConfig,
      viewKey,
      routeDomain,
      routePath,
      routeId,
      routeQuery,
    });

  // Build params replacement facility
  const paramsReplacer = useParamsReplacer(datasetQuery);
  const propertyMappingsReplacer = usePropertyMappingReplacer(paramsReplacer);
  const extractValueByPath = useValueByPathExtractor(propertyMappingsReplacer);

  const view = useComputeView({
    datasetConfig,
    viewKey,
    propertyMappingsReplacer,
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
    isResolving: readonly(isResolving),
    isError: readonly(isError),
    error: readonly(error),
    hasConfig: computed(() => datasetConfig.value != null),
    view: readonly(view),
    description: computed(() => datasetConfig.value?.description),
    fullPath: readonly(fullPath),
    datasetDomain: readonly(datasetDomain),
    datasetPath: readonly(datasetPath),
    datasetQuery: readonly(datasetQuery),
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
