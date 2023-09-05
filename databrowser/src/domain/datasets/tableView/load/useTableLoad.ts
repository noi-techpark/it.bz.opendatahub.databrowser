// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, watch } from 'vue';
import { PaginationData } from '../../../api';
import { defaultTablePagination } from '../defaultValues';
import {
  buildAuthInterceptor,
  useBaseAxiosFetch,
} from '../../../api/client/fetcher/axios';
import { useTableConfig } from './useTableConfig';
import { useAuth } from '../../../auth/store/auth';
import { storeToRefs } from 'pinia';

const buildFallbackRows = (pageSize: number) =>
  [...Array(pageSize).keys()].map((_, index) => ({ Id: index }));

export const useTableLoad = <T = unknown>() => {
  // Resolved table config
  const {
    url,
    cols,
    editRecordSupported,
    hasDetailView,
    hasQuickView,
    isResolving,
    mapper,
  } = useTableConfig<T>();

  // Fetch data
  const {
    data,
    error,
    isError,
    isLoading: isDataLoading,
  } = useBaseAxiosFetch<PaginationData<T> | null, T>(url, {
    beforeFetch: buildAuthInterceptor(),
    afterFetch: (ctx) => (ctx.data == null ? null : mapper(ctx.data)),
  });

  const isLoading = computed(() => isResolving.value || isDataLoading.value);

  // If there are no items yet (e.g. because of initial load),
  // show a fallback table with empty rows
  const rows = computed(() =>
    isLoading.value
      ? buildFallbackRows(data.value?.pagination.pageSize ?? 25)
      : data.value?.items ?? []
  );

  // Handle pagination
  const pagination = computed(
    () => data.value?.pagination ?? defaultTablePagination
  );

  return {
    cols,
    rows,
    pagination,
    isError,
    isLoading,
    error,
    url,
    editRecordSupported,
    hasDetailView,
    hasQuickView,
  };
};
