// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ref, watch } from 'vue';
import { stringifyQuery } from 'vue-router';
import { PaginationData, defaultPagination } from '../../../api';
import { computeDatasetConfigForCurrentRoute } from '../../../datasetConfig/datasetConfig';
import { computeTableSettings } from './tableSettings';
import { ListElements } from '../../../datasetConfig/types';
import { useDatasetPermissions } from '../../../datasetConfig/useDatasetPermissions';

export const useTableConfig = <T>() => {
  const { resolvedDatasetConfig, isResolving, tableView, allParams } =
    computeDatasetConfigForCurrentRoute();

  const url = ref<string>();
  const cols = ref<ListElements[]>([]);
  const hasDetailView = ref(false);
  const hasQuickView = ref(false);

  const { editRecordSupported } = useDatasetPermissions(resolvedDatasetConfig);

  let mapper: (data: T) => PaginationData<T> = () => ({
    items: [],
    pagination: defaultPagination,
  });

  watch(
    isResolving,
    (resolving) => {
      if (resolving) {
        return;
      }

      // Get table columns from dataset config
      cols.value = tableView.value?.elements ?? [];

      hasDetailView.value = resolvedDatasetConfig.value?.hasDetailView ?? false;
      hasQuickView.value = resolvedDatasetConfig.value?.hasQuickView ?? false;

      // Compute table settings
      const { dataMapper } = computeTableSettings<T>(
        resolvedDatasetConfig.value?.domain,
        allParams.value
      );
      mapper = dataMapper;

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
  allParams: Record<string, string>
) => {
  if (currentPath == null) {
    return undefined;
  }

  const queryParams = stringifyQuery(allParams);

  return currentPath + (queryParams.length > 0 ? '?' + queryParams : '');
};
