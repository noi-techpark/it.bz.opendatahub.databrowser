// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ref, watch } from 'vue';
import { LocationQuery, stringifyQuery, useRoute } from 'vue-router';
import { PaginationData, defaultPagination } from '../../../api';
import { computeDatasetConfigForCurrentRoute } from '../../../datasetConfig/datasetConfig';
import { ListElements } from '../../../datasetConfig/types';
import { useDatasetPermissions } from '../../../datasetConfig/useDatasetPermissions';

export const useSingleDatasetConfig = <T>() => {
  const {
    config,
    defaultQueryParams,
    isResolving,
    detailView,
    editView,
    newView,
  } = computeDatasetConfigForCurrentRoute();

  const url = ref<string>();
  const hasDetailView = ref(false);
  const hasEditView = ref(false);
  const hasQuickView = ref(false);

  const { addRecordSupported, editRecordSupported } =
    useDatasetPermissions(config);

  const mapper: (data: T) => PaginationData<T> = () => ({
    items: [],
    pagination: defaultPagination,
  });

  const route = useRoute();
  watch(
    isResolving,
    (resolving) => {
      if (resolving) {
        return;
      }

      hasDetailView.value = config.value?.hasDetailView ?? false;
      hasEditView.value = config.value?.hasEditView ?? false;
      hasQuickView.value = config.value?.hasQuickView ?? false;

      // Compute url
      url.value = computeUrl(
        config.value?.currentPath,
        defaultQueryParams.value,
        route.query
      );
    },
    { immediate: true }
  );

  return {
    url,
    addRecordSupported,
    editRecordSupported,
    hasDetailView,
    hasEditView,
    hasQuickView,
    isResolving,
    mapper: (data: T) => mapper(data),
  };
};

const computeUrl = (
  currentPath: string | undefined,
  defaultQueryParams: LocationQuery,
  routeQueryParams: LocationQuery
) => {
  if (currentPath == null) {
    return undefined;
  }

  const queryParams = stringifyQuery({
    ...defaultQueryParams,
    ...routeQueryParams,
  });

  return currentPath + (queryParams.length > 0 ? '?' + queryParams : '');
};
