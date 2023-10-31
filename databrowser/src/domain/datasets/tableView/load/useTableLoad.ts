// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed } from 'vue';
import {
  buildAuthInterceptor,
  useBaseAxiosFetch,
} from '../../../api/client/fetcher/axios';
import { useTableConfig } from './useTableConfig';
import { ListElements } from '../../../datasetConfig/types';
import { CellComponent } from '../../../cellComponents/types';

const buildFallbackRows = (pageSize: number) =>
  [...Array(pageSize).keys()].map((_, index) => ({ Id: index }));

export const useTableLoad = <T = unknown>() => {
  // Resolved table config
  const {
    apiPath,
    cols,
    editRecordSupported,
    hasDetailView,
    hasQuickView,
    isResolving,
    extractData,
    paginationProvider,
  } = useTableConfig<T>();

  // Fetch data
  const {
    data,
    error,
    isError,
    isLoading: isDataLoading,
  } = useBaseAxiosFetch<unknown, T>(apiPath, {
    beforeFetch: buildAuthInterceptor(),
    afterFetch: (ctx) => extractData(ctx.data),
  });

  const isLoading = computed(() => isResolving.value || isDataLoading.value);

  // If there are no items yet (e.g. because of initial load),
  // show a fallback table with empty rows
  const rows = computed(() =>
    isLoading.value
      ? buildFallbackRows(pagination.value?.pageSize ?? 25)
      : data.value ?? []
  );

  // Handle pagination
  // const pagination = computed(
  //   () => data.value?.pagination ?? defaultTablePagination
  // );
  const pagination = computed(() => paginationProvider.value?.(data.value));

  // Compute cols with loading support
  const colsWithLoadingSupport = computed<ListElements[]>(() => {
    if (!isLoading.value) {
      return cols.value;
    }

    return cols.value.map<ListElements>((col) => ({
      title: col.title,
      component: CellComponent.LoadingCell,
      fields: {},
      class: col.class,
    }));
  });

  return {
    cols: colsWithLoadingSupport,
    rows,
    pagination,
    isError,
    isLoading,
    error,
    apiPath,
    editRecordSupported,
    hasDetailView,
    hasQuickView,
  };
};
