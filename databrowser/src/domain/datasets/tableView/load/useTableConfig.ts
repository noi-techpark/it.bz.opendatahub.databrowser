// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ref, watch } from 'vue';
// import { computeDatasetConfigForCurrentRoute } from '../../../datasetConfig/datasetConfigResolver';
// import { computeTablePagination } from './useTablePagination';
import { ListElements } from '../../../datasetConfig/types';
import { useDatasetPermissions } from '../../../datasetConfig/useDatasetPermissions';
import { extractTableData } from './useTableDataExtraction';

export const useTableConfig = <T>() => {
  const {
    isResolving,
    tableView,
    paginationProvider,
    apiPath,
    hasDetailView,
    hasQuickView,
    hasNewView,
    hasEditView,
    datasetDomain,
    isEmbeddedSource,
    datasetConfig,
  } = computeDatasetConfigForCurrentRoute();

  const cols = ref<ListElements[]>([]);

  const { editRecordSupported } = useDatasetPermissions({
    datasetConfig,
    hasEditView,
    hasNewView,
    isEmbeddedSource,
  });

  let extractData: (data: T) => unknown = () => ({});

  watch(
    isResolving,
    (resolving) => {
      if (resolving) {
        return;
      }

      // Get table columns from dataset config
      cols.value = tableView.value?.elements ?? [];

      extractData = extractTableData<T, unknown>(datasetDomain.value);
    },
    { immediate: true }
  );

  return {
    apiPath,
    cols,
    editRecordSupported,
    hasDetailView,
    hasQuickView,
    isResolving,
    extractData,
    paginationProvider,
  };
};

// const computeUrl = (
//   currentPath: string | undefined,
//   allParams: Record<string, string>
// ) => {
//   if (currentPath == null) {
//     return undefined;
//   }

//   const queryParams = stringifyQuery(allParams);

//   return currentPath + (queryParams.length > 0 ? '?' + queryParams : '');
// };
