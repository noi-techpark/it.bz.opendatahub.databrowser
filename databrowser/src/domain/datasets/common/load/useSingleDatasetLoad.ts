// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed } from 'vue';
import { PaginationData } from '../../../api';
import {
  buildAuthInterceptor,
  useBaseAxiosFetch,
} from '../../../api/client/fetcher/axios';
import { useSingleDatasetConfig } from './useSingleDatasetConfig';

const buildFallbackRows = (pageSize: number) =>
  [...Array(pageSize).keys()].map((_, index) => ({ Id: index }));

export const useSingleDatasetLoad = <T = unknown>() => {
  // Resolve view config
  const {
    url,
    addRecordSupported,
    editRecordSupported,
    hasDetailView,
    hasQuickView,
    isResolving,
  } = useSingleDatasetConfig<T>();

  // Fetch data
  const {
    data,
    error,
    isError,
    isLoading: isDataLoading,
  } = useBaseAxiosFetch<PaginationData<T> | null, T>(url, {
    beforeFetch: buildAuthInterceptor(),
  });

  const isLoading = computed(() => isResolving.value || isDataLoading.value);

  console.log('useSingleDatasetLoad');

  return {
    data,
    isError,
    isLoading,
    error,
    url,
  };
};
