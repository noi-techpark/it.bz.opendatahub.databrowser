// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ref, watch } from 'vue';
import { LocationQuery, stringifyQuery, useRoute } from 'vue-router';
import { PaginationData, defaultPagination } from '../../../api';
import { computeDatasetConfigForCurrentRoute } from '../../../datasetConfig/datasetConfig';
import { computeTableSettings } from './tableSettings';
import { ListElements } from '../../../datasetConfig/types';
import { useDatasetPermissions } from '../../../datasetConfig/useDatasetPermissions';

export const useTableConfig = <T>() => {
  const { config, isResolving, tableView } =
    computeDatasetConfigForCurrentRoute();

  const url = ref<string>();
  const cols = ref<ListElements[]>([]);
  const hasDetailView = ref(false);
  const hasQuickView = ref(false);

  const { editRecordSupported } = useDatasetPermissions(config);

  let mapper: (data: T) => PaginationData<T> = () => ({
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

      // Get table columns from dataset config
      cols.value = tableView.value?.elements ?? [];

      hasDetailView.value = config.value?.hasDetailView ?? false;
      hasQuickView.value = config.value?.hasQuickView ?? false;

      // Compute table settings
      const { dataMapper, defaultQueryParams } = computeTableSettings<T>(
        config.value?.domain,
        route.query
      );
      mapper = dataMapper;

      // Compute url
      url.value = computeUrl(
        config.value?.currentPath,
        defaultQueryParams,
        route.query
      );
    },
    { immediate: true }
  );

  return {
    url,
    cols,
    editRecordSupported,
    hasDetailView,
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
