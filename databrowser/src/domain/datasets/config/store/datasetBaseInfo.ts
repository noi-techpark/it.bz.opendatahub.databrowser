// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, ToRefs, computed, ref, toValue } from 'vue';
import { useResolveDatasetConfig } from '../../../datasetConfig/datasetConfigResolver';
import { useDatasetConfigSourceComputations } from '../../../datasetConfig/datasetConfigSource';
import { DatasetConfigSource } from '../../../datasetConfig/load/types';
import { useComputeDatasetLocation } from '../../../datasetConfig/location/datasetLocation';
import { RouteLocation } from '../../../datasetConfig/types';
import { useComputeViewKey } from '../../../datasetConfig/view/viewKey';
import { useStringReplacer } from '../../../datasetConfig/replace/stringReplacer';
import { useObjectValueReplacer } from '../../../datasetConfig/replace/objectValueReplacer';
import { useValueExtractor } from '../../../datasetConfig/extract/valueExtractor';

export const useDatasetBaseInfo = (
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

  // Build params replacement facilities
  const stringifiedQuery = computed(() => toValue(datasetQuery)?.stringified);
  const stringReplacer = useStringReplacer(stringifiedQuery);
  const objectValueReplacer = useObjectValueReplacer(stringReplacer);
  const extractValueByPath = useValueExtractor(stringReplacer);

  // Compute source type
  const { isEmbeddedSource, isGeneratedSource } =
    useDatasetConfigSourceComputations(datasetConfig);

  return {
    isLoading: isResolving,
    isError,
    error,
    datasetDomain,
    datasetPath,
    datasetQuery,
    datasetId,
    fullPath,
    viewKey,
    hasConfig: computed(() => datasetConfig.value != null),
    baseViews: computed(() => datasetConfig.value?.views),
    description: computed(() => datasetConfig.value?.description),
    operations: computed(() => datasetConfig.value?.operations),
    stringReplacer,
    objectValueReplacer,
    extractValueByPath,
    isEmbeddedSource,
    isGeneratedSource,
  };
};
